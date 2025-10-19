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
    <div className="flex justify-between border-b border-border py-2 flex-wrap">
      <span className="font-semibold text-muted-foreground">{label}</span>
      <span
        className={`${
          highlight ? "font-bold text-primary" : "text-foreground"
        } break-words max-w-full sm:max-w-[60%]`}
      >
        {value || "—"}
      </span>
    </div>
  );

  const renderRating = (rating) => (
    <div className="flex items-center space-x-1">
      <Star className="w-4 h-4 text-warning" />
      <span className="font-semibold">{rating ?? 0}</span>
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
    <main className="min-h-screen py-5 px-4 sm:px-6 md:px-16 bg-background text-foreground">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* --- User Organization --- */}
        {orgData && (
          <Card className="rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-3xl text-primary font-bold">
                Your Organization
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Manage your organization directly from here
              </CardDescription>
            </CardHeader>

            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              {/* Basic Info */}
              {renderField("Name", orgData.name, true)}
              {renderField("Email", orgData.email)}
              {renderField("Phone", orgData.phone)}
              {renderField("Alternative Phone", orgData.alternativePhone)}
              {renderField("Category", orgData.category, true)}
              {renderField("Sub-Category", orgData.subCategory)}
              {renderField("Website", orgData.website)}
              {renderField("Verified", orgData.verified ? "Yes" : "No", true)}
              {renderField("Active", orgData.active ? "Yes" : "No")}
              {renderField("Trust Score", orgData.trustScore)}
              {renderField("Risk Level", orgData.riskLevel)}
              {renderField("Platform Share", `${orgData.platformShare}%`)}
              {renderField(
                "Created At",
                new Date(orgData.createdAt).toLocaleString()
              )}
              {renderField(
                "Rating",
                renderRating(orgData.rating?.averageRating),
                true
              )}

              {/* Address */}
              {orgData.address && (
                <>
                  <div className="col-span-2 mt-4 font-semibold text-lg text-primary">
                    Address
                  </div>
                  {renderField("Street", orgData.address.street)}
                  {renderField("City", orgData.address.city)}
                  {renderField("State", orgData.address.state)}
                  {renderField("Country", orgData.address.country)}
                  {renderField("Zip Code", orgData.address.zipCode)}
                </>
              )}

              {/* Bank Details */}
              {orgData.bankDetails && (
                <>
                  <div className="col-span-2 mt-4 font-semibold text-lg text-primary">
                    Bank Details
                  </div>
                  {renderField("Account Holder", orgData.bankDetails.accountHolderName)}
                  {renderField("Bank Name", orgData.bankDetails.bankName)}
                  {renderField("Branch", orgData.bankDetails.branchName)}
                  {renderField("Account Number", orgData.bankDetails.accountNumber)}
                  {renderField("IFSC", orgData.bankDetails.ifscCode)}
                  {renderField("UPI ID", orgData.bankDetails.upiId)}
                </>
              )}

              {/* Support Contact */}
              {orgData.supportContact && (
                <>
                  <div className="col-span-2 mt-4 font-semibold text-lg text-primary">
                    Support Contact
                  </div>
                  {renderField("Name", orgData.supportContact.name)}
                  {renderField("Email", orgData.supportContact.email)}
                  {renderField("Phone", orgData.supportContact.phone)}
                </>
              )}

              {/* Event Preferences */}
              {orgData.eventPreferences && (
                <>
                  <div className="col-span-2 mt-4 font-semibold text-lg text-primary">
                    Event Preferences
                  </div>
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
                <>
                  <div className="col-span-2 mt-4 font-semibold text-lg text-primary">
                    Stats
                  </div>
                  {renderField("Total Events Hosted", orgData.stats.totalEventsHosted)}
                  {renderField("Total Tickets Sold", orgData.stats.totalTicketsSold)}
                  {renderField("Total Revenue Generated", orgData.stats.totalRevenueGenerated)}
                  {renderField("Total Blocked Events", orgData.stats.totalBlockedEvents)}
                  {renderField("Total Warnings", orgData.stats.totalWarnings)}
                </>
              )}

              {/* Social Links as Icons */}
              {orgData.socialLinks && (
                <>
                  <div className="col-span-2 mt-4 font-semibold text-lg text-primary">
                    Social Links
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {Object.entries(orgData.socialLinks).map(([key, value]) => {
                      if (!value) return null;
                      const Icon = socialIconMap[key];
                      return (
                        <a
                          key={key}
                          href={value}
                          target="_blank"
                          className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition"
                        >
                          <Icon className="w-5 h-5" />
                        </a>
                      );
                    })}
                  </div>
                </>
              )}
            </CardContent>

            <CardFooter className="flex justify-end flex-wrap gap-2">
              <Link
                href={`${process.env.NEXT_PUBLIC_ADMIN_URL}?auth=${localStorage.getItem(
                  "token"
                )}&orgId=${orgData._id}`}
                target="_blank"
              >
                <Button>Manage in Admin Panel</Button>
              </Link>
            </CardFooter>
          </Card>
        )}

        {/* --- Public Organizations --- */}
        {organizationList.length > 0 && (
          <div className="space-y-8 pb-10">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <h2 className="text-3xl font-extrabold text-primary">
                Public Organizations
              </h2>
              {!orgData && (
                <Button onClick={handleCreateClick}>Create New Organization</Button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {organizationList.map((org) => (
                <Card
                  key={org._id}
                  className="group cursor-pointer hover:shadow-lg transition-shadow rounded-2xl flex flex-col justify-between border border-border"
                  onClick={() => router.push(`/organization/${org.slug}`)}
                >
                  <CardHeader className="px-5 pt-5">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-xl font-bold truncate">
                        {org.name}
                      </CardTitle>
                      <span className="px-2 py-1 bg-primary/20 text-xs font-semibold rounded-full text-primary">
                        {org.category}
                      </span>
                    </div>
                    <CardDescription className="truncate text-muted-foreground">
                      Admin: <span>{org.admin?.name}</span> ({org.admin?.email})
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="px-5 text-sm space-y-2">
                    <div className="flex items-center space-x-2 flex-wrap">
                      <span className="font-semibold">Rating:</span>
                      {renderRating(org.rating?.averageRating)}
                      <span className="text-xs text-muted-foreground">
                        ({org.rating?.totalRatings ?? 0})
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold">Created:</span>{" "}
                      {new Date(org.createdAt).toLocaleDateString()}
                    </div>
                    <div className="truncate">
                      <span className="font-semibold">Address:</span>{" "}
                      {org.address?.street}, {org.address?.city}
                    </div>
                  </CardContent>

                  <CardFooter className="px-5 pb-5 flex gap-2 flex-wrap">
                    {Object.entries(org.socialLinks || {}).map(([key, value]) => {
                      if (!value) return null;
                      const Icon = socialIconMap[key];
                      return (
                        <a
                          key={key}
                          href={value}
                          target="_blank"
                          className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition"
                        >
                          <Icon className="w-4 h-4" />
                        </a>
                      );
                    })}
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* --- No Data --- */}
        {!orgData && organizationList.length === 0 && (
          <div className="text-center py-16">
            <h2 className="text-4xl font-extrabold mb-6 text-primary">
              No Organizations Found
            </h2>
            <p className="text-muted-foreground mb-8">
              You haven’t created an organization yet.
            </p>
            <Button onClick={handleCreateClick}>Create Organization</Button>
          </div>
        )}
      </div>
    </main>
  );
}
