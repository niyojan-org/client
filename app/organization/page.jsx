"use client";

import api from "@/lib/api";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Facebook, Instagram, Twitter, Linkedin, Youtube, Globe } from "lucide-react";
import { SpinnerCustom } from "@/components/ui/spinner";
import { useUserStore } from "@/store/userStore";
import { Badge } from "@/components/ui/badge";

export default function Organization() {
  const { isAuthenticated, loading: userLoading } = useUserStore();
  const router = useRouter();

  const [orgData, setOrgData] = useState(null);
  const [organizationList, setOrganizationList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (userLoading) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        let userOrg = null;

        if (isAuthenticated) {
          try {
            const res = await api.get("/org/me");
            userOrg = res.data.org;
            setOrgData(userOrg);
          } catch {
            setOrgData(null);
          }
        }

        const publicRes = await api.get("/org/public");
        let publicList = publicRes.data.data || [];

        if (userOrg) {
          publicList = publicList.filter((org) => org._id !== userOrg._id);
        }

        setOrganizationList(publicList);
        setError("");
      } catch {
        setError("Failed to fetch organization data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated, userLoading]);

  const handleCreateClick = () => {
    router.push(isAuthenticated ? "/organization/create" : "/auth?view=login");
  };

  const renderField = (label, value, highlight = false) => (
    <div className="space-y-1 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
        {label}
      </p>
      <p
        className={`${highlight ? "font-bold text-primary text-base" : "text-foreground font-medium"
          } break-words`}
      >
        {value || "—"}
      </p>
    </div>
  );

  const renderRating = (rating) => (
    <div className="flex items-center space-x-1">
      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      <span className="font-semibold">{rating ?? 0}</span>
    </div>
  );

  const renderSection = (title, children) => (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-foreground border-l-4 border-primary pl-3">
        {title}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {children}
      </div>
    </div>
  );

  const socialIconMap = {
    facebook: Facebook,
    instagram: Instagram,
    twitter: Twitter,
    linkedin: Linkedin,
    youtube: Youtube,
    blog: Globe,
  };

  if (loading || userLoading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-64px)] bg-background">
        <SpinnerCustom />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-64px)] bg-background">
        <p className="text-destructive font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <main className="pb-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* --- User Organization --- */}
        {orgData && (
          <Card className="border-2 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
            <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background p-6 border-b">
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 flex-wrap">
                    <CardTitle className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                      {orgData.name}
                    </CardTitle>
                    {orgData.verified && (
                      <Badge className="bg-green-500/10 text-green-600 border-green-500/20 hover:bg-green-500/20">
                        ✓ Verified
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="text-base flex items-center gap-2 flex-wrap">
                    <span className="font-semibold">{orgData.category}</span>
                    {orgData.subCategory && (
                      <>
                        <span className="text-muted-foreground/50">•</span>
                        <span>{orgData.subCategory}</span>
                      </>
                    )}
                  </CardDescription>
                  <div className="flex items-center gap-4 flex-wrap">
                    {renderRating(orgData.rating?.averageRating)}
                    <span className="text-sm text-muted-foreground">
                      ({orgData.rating?.totalRatings ?? 0} ratings)
                    </span>
                  </div>
                </div>
                <Link
                  href={`${process.env.NEXT_PUBLIC_ADMIN_URL}?auth=${localStorage.getItem(
                    "token"
                  )}&orgId=${orgData._id}`}
                  target="_blank"
                >
                  <Button size="lg" className="shadow-lg hover:shadow-xl transition-all">
                    Manage Dashboard
                  </Button>
                </Link>
              </div>
            </div>

            <CardContent className="p-6 space-y-8">
              {/* Contact Information */}
              {renderSection(
                "Contact Information",
                <>
                  {renderField("Email", orgData.email, true)}
                  {renderField("Phone", orgData.phone)}
                  {renderField("Alternative Phone", orgData.alternativePhone)}
                  {renderField("Website", orgData.website)}
                </>
              )}

              {/* Organization Details */}
              {renderSection(
                "Organization Details",
                <>
                  {renderField("Trust Score", orgData.trustScore, true)}
                  {renderField("Risk Level", orgData.riskLevel)}
                  {renderField("Platform Share", `${orgData.platformShare}%`)}
                  {renderField("Status", orgData.active ? "Active" : "Inactive", true)}
                  {renderField(
                    "Registered",
                    new Date(orgData.createdAt).toLocaleDateString()
                  )}
                </>
              )}

              {/* Address */}
              {orgData.address && renderSection(
                "Address",
                <>
                  {renderField("Street", orgData.address.street)}
                  {renderField("City", orgData.address.city)}
                  {renderField("State", orgData.address.state)}
                  {renderField("Country", orgData.address.country)}
                  {renderField("Zip Code", orgData.address.zipCode)}
                </>
              )}

              {/* Bank Details */}
              {orgData.bankDetails && renderSection(
                "Bank Details",
                <>
                  {renderField("Account Holder", orgData.bankDetails.accountHolderName)}
                  {renderField("Bank Name", orgData.bankDetails.bankName)}
                  {renderField("Branch", orgData.bankDetails.branchName)}
                  {renderField("Account Number", "****" + orgData.bankDetails.accountNumber?.slice(-4))}
                  {renderField("IFSC Code", orgData.bankDetails.ifscCode)}
                  {renderField("UPI ID", orgData.bankDetails.upiId)}
                </>
              )}

              {/* Support Contact */}
              {orgData.supportContact && renderSection(
                "Support Contact",
                <>
                  {renderField("Name", orgData.supportContact.name)}
                  {renderField("Email", orgData.supportContact.email)}
                  {renderField("Phone", orgData.supportContact.phone)}
                </>
              )}

              {/* Event Preferences */}
              {orgData.eventPreferences && renderSection(
                "Event Preferences",
                <>
                  {renderField(
                    "Max Events Per Month",
                    orgData.eventPreferences.maxEventsPerMonth
                  )}
                  {renderField(
                    "Preferred Event Types",
                    orgData.eventPreferences.preferredEventTypes.join(", ")
                  )}
                  {renderField(
                    "Allows Paid Events",
                    orgData.eventPreferences.allowsPaidEvents ? "Yes" : "No"
                  )}
                  {renderField(
                    "Auto Approve Events",
                    orgData.eventPreferences.autoApproveEvents ? "Yes" : "No"
                  )}
                </>
              )}

              {/* Stats */}
              {orgData.stats && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-foreground border-l-4 border-primary pl-3">
                    Statistics
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    <div className="text-center p-4 rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20">
                      <p className="text-2xl font-bold text-blue-600">{orgData.stats.totalEventsHosted}</p>
                      <p className="text-xs text-muted-foreground mt-1">Events Hosted</p>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20">
                      <p className="text-2xl font-bold text-green-600">{orgData.stats.totalTicketsSold}</p>
                      <p className="text-xs text-muted-foreground mt-1">Tickets Sold</p>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20">
                      <p className="text-2xl font-bold text-purple-600">₹{orgData.stats.totalRevenueGenerated}</p>
                      <p className="text-xs text-muted-foreground mt-1">Revenue</p>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-gradient-to-br from-red-500/10 to-red-500/5 border border-red-500/20">
                      <p className="text-2xl font-bold text-red-600">{orgData.stats.totalBlockedEvents}</p>
                      <p className="text-xs text-muted-foreground mt-1">Blocked Events</p>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border border-yellow-500/20">
                      <p className="text-2xl font-bold text-yellow-600">{orgData.stats.totalWarnings}</p>
                      <p className="text-xs text-muted-foreground mt-1">Warnings</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Social Links */}
              {orgData.socialLinks && Object.values(orgData.socialLinks).some(v => v) && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-foreground border-l-4 border-primary pl-3">
                    Social Links
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {Object.entries(orgData.socialLinks).map(([key, value]) => {
                      if (!value) return null;
                      const Icon = socialIconMap[key];
                      return (
                        <a
                          key={key}
                          href={value}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 border border-primary/20 hover:border-primary"
                        >
                          <Icon className="w-4 h-4" />
                          <span className="text-sm font-medium capitalize">{key}</span>
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* --- Public Organizations --- */}
        {organizationList.length > 0 && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  Discover Organizations
                </h2>
                <p className="text-muted-foreground mt-2">
                  Explore {organizationList.length} verified organizations
                </p>
              </div>
              {!orgData && (
                <Button onClick={handleCreateClick} size="lg" className="shadow-lg hover:shadow-xl transition-all">
                  Create Organization
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {organizationList.map((org) => (
                <Card
                  key={org._id}
                  className="group cursor-pointer hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary/50 overflow-hidden"
                  onClick={() => router.push(`/organization/${org.slug}`)}
                >
                  <div className="h-2 bg-gradient-to-r from-primary via-primary/60 to-primary/40 group-hover:h-3 transition-all duration-300" />
                  
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-3">
                      <CardTitle className="text-xl font-bold truncate group-hover:text-primary transition-colors">
                        {org.name}
                      </CardTitle>
                      <Badge variant="secondary" className="shrink-0">
                        {org.category}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-2 mt-2">
                      {renderRating(org.rating?.averageRating)}
                      <span className="text-xs text-muted-foreground">
                        ({org.rating?.totalRatings ?? 0})
                      </span>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <span className="text-primary font-bold text-xs">
                          {org.admin?.name?.charAt(0)?.toUpperCase()}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium truncate">{org.admin?.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{org.admin?.email}</p>
                      </div>
                    </div>

                    {org.address && (
                      <div className="text-sm p-2 rounded-lg bg-muted/30">
                        <p className="text-muted-foreground text-xs mb-1">Location</p>
                        <p className="font-medium truncate">
                          {org.address?.city}, {org.address?.state}
                        </p>
                      </div>
                    )}

                    <div className="text-xs text-muted-foreground">
                      Registered {new Date(org.createdAt).toLocaleDateString()}
                    </div>
                  </CardContent>

                  <CardFooter className="bg-muted/20 pt-4">
                    <div className="flex gap-2 flex-wrap w-full">
                      {Object.entries(org.socialLinks || {}).map(([key, value]) => {
                        if (!value) return null;
                        const Icon = socialIconMap[key];
                        return (
                          <a
                            key={key}
                            href={value}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                          >
                            <Icon className="w-4 h-4" />
                          </a>
                        );
                      })}
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* --- No Data --- */}
        {!orgData && organizationList.length === 0 && (
          <Card className="text-center py-16 border-2 border-dashed">
            <CardContent className="space-y-6">
              <div className="w-24 h-24 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <Globe className="w-12 h-12 text-primary" />
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl md:text-4xl font-bold">
                  Start Your Journey
                </h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Create your organization and connect with thousands of event attendees
                </p>
              </div>
              <Button onClick={handleCreateClick} size="lg" className="shadow-lg hover:shadow-xl transition-all">
                Create Your Organization
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}
