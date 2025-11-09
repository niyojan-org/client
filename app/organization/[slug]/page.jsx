"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import useOrganizationStore from "@/store/eventStore";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Star, CheckCircle2, Mail, MapPin, Users, Award, Globe, ArrowRight } from "lucide-react";
import { SpinnerCustom } from "@/components/ui/spinner";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconBrandYoutube,
  IconGlobe,
} from "@tabler/icons-react";

export default function OrganizationPage() {
  const { slug } = useParams();
  const { organization, loading, error, fetchOrganizationBySlug } = useOrganizationStore();

  useEffect(() => {
    if (slug) fetchOrganizationBySlug(slug);
  }, [slug]);

  const renderRating = (rating) => (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${star <= (rating ?? 0) ? "fill-yellow-400 text-yellow-400" : "text-muted"}`}
        />
      ))}
      <span className="ml-2 text-sm font-medium text-muted-foreground">{rating ?? 0}/5</span>
    </div>
  );

  if (loading)
    return (
      <div className="flex justify-center items-center h-[calc(100vh-64px)]">
        <SpinnerCustom className="w-8 h-8 text-primary" />
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-[calc(100vh-64px)]">
        <p className="text-destructive">{error}</p>
      </div>
    );

  if (!organization)
    return (
      <div className="flex justify-center items-center h-[calc(100vh-64px)]">
        <p className="text-muted-foreground">Organization not found.</p>
      </div>
    );

  return (
    <main className="pt-5 px-6 md:px-16 min-h-screen bg-background">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10 rounded-xl p-5 shadow-sm">
          <p className="text-sm text-muted-foreground mb-2">
            <Link href="/" className="hover:underline">Home</Link> / Organizations /{" "}
            <span className="font-medium text-primary">{organization.slug}</span>
          </p>
          <h1 className="text-4xl font-bold text-primary">{organization.name}</h1>
          <div className="mt-3 flex items-center gap-3 flex-wrap">
            <Badge variant="outline">{organization.category} / {organization.subCategory}</Badge>
            {organization.verified && (
              <Badge variant="success" className="bg-success/10 text-success flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Verified
              </Badge>
            )}
            {renderRating(organization.rating?.averageRating)}
          </div>
        </div>

        {/* Main Card */}
        <Card className="rounded-xl shadow-xl border-2 py-4">
          <CardHeader>
            <CardTitle className="text-xl text-foreground">About the Organization</CardTitle>
          </CardHeader>

          <CardContent className="space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <InfoSection
                icon={<Mail className="w-5 h-5 text-primary" />}
                title="Contact"
                items={[
                  { label: "Email", value: organization.email },
                  { label: "Phone", value: organization.phone || "—" },
                  organization.alternativePhone && { label: "Alt Phone", value: organization.alternativePhone },
                ].filter(Boolean)}
              />

              <InfoSection
                icon={<MapPin className="w-5 h-5 text-primary" />}
                title="Location"
                items={[
                  {
                    label: "Address",
                    value: `${organization.address?.street}, ${organization.address?.city}, ${organization.address?.state}, ${organization.address?.country} ${organization.address?.zipCode}`,
                  },
                ]}
              />

              <InfoSection
                icon={<Users className="w-5 h-5 text-primary" />}
                title="Team & Admin"
                items={[
                  { label: "Admin", value: `${organization.admin?.name} (${organization.admin?.email})` },
                  { label: "Support", value: `${organization.supportContact?.name} | ${organization.supportContact?.phone}` },
                ]}
              />

              <InfoSection
                icon={<Award className="w-5 h-5 text-primary" />}
                title="Statistics"
                items={[
                  { label: "Events Hosted", value: organization.stats?.totalEventsHosted ?? 0 },
                  { label: "Member Since", value: new Date(organization.createdAt).toLocaleDateString() },
                ]}
              />
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-3">Event Preferences</h3>
              <div className="flex flex-wrap gap-2">
                {organization.eventPreferences?.preferredEventTypes?.map((type) => (
                  <Badge key={type} variant="secondary">{type}</Badge>
                ))}
                <Badge variant={organization.eventPreferences?.allowsPaidEvents ? "success" : "secondary"}>
                  {organization.eventPreferences?.allowsPaidEvents ? "Paid Events Allowed" : "Free Only"}
                </Badge>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-wrap gap-4 justify-between items-center">
            <DynamicSocialLinks links={organization.socialLinks || {}} />
            <div className="flex gap-3">
              {/* <Button asChild variant="outline">
                <Link href={`/events?org=${organization.slug}`} className="flex items-center gap-2">
                  View Events <ArrowRight className="w-4 h-4" />
                </Link>
              </Button> */}
              <Button
                onClick={() => window.open(organization.website, "_blank")}
                className="flex items-center gap-2"
              >
                <Globe className="w-4 h-4" />
                Visit Website
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}

/* Info Section */
const InfoSection = ({ icon, title, items }) => (
  <div className="space-y-3">
    <div className="flex items-center gap-2">
      {icon}
      <h3 className="font-semibold text-lg">{title}</h3>
    </div>
    <div className="space-y-2">
      {items.map((item, index) => (
        <div key={index} className="text-sm">
          <span className="text-muted-foreground font-medium">{item.label}:</span>
          <span className="ml-2 text-foreground">{item.value}</span>
        </div>
      ))}
    </div>
  </div>
);

/* Social Links */
const DynamicSocialLinks = ({ links }) => {
  const socialMap = {
    facebook: IconBrandFacebook,
    instagram: IconBrandInstagram,
    twitter: IconBrandTwitter,
    linkedin: IconBrandLinkedin,
    youtube: IconBrandYoutube,
    blog: IconGlobe,
  };

  return (
    <div className="flex gap-3">
      {Object.entries(socialMap).map(([key, Icon]) => {
        if (!links[key]) return null;
        return (
          <Link key={key} href={links[key]} target="_blank" className="p-2 rounded-full hover:bg-muted">
            <Icon className="w-5 h-5" />
          </Link>
        );
      })}
    </div>
  );
};
