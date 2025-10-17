'use client';

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import useOrganizationStore from "@/store/eventStore";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Star, CheckCircle2, Mail, MapPin, Users, Award, Globe } from "lucide-react";
import { SpinnerCustom } from "@/components/ui/spinner";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
// Tabler Icons for social links
import { IconBrandFacebook, IconBrandInstagram, IconBrandLinkedin, IconBrandTwitter, IconBrandYoutube, IconGlobe } from "@tabler/icons-react";

export default function OrganizationPage() {
  const { slug } = useParams();
  const { organization, loading, error, fetchOrganizationBySlug } = useOrganizationStore();

  useEffect(() => {
    if (slug) fetchOrganizationBySlug(slug);
  }, [slug]);

  const renderRating = (rating) => (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${star <= (rating ?? 0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
        />
      ))}
      <span className="ml-2 font-medium">{rating ?? 0}/5</span>
    </div>
  );

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-[calc(100vh-64px)]">
        <SpinnerCustom className="w-8 h-8 text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-64px)]">
        <div className="text-destructive text-center">
          <p className="text-lg font-semibold">Error loading organization</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (!organization) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-64px)]">
        <p className="text-muted-foreground font-medium">Organization not found.</p>
      </div>
    );
  }

  return (
    <main className="pt-24 px-6 md:px-16 bg-background min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8">
        <Card className="rounded-xl shadow-xl border-2">
          {/* Header */}
          <CardHeader className="space-y-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-3xl text-primary font-bold">{organization.name}</CardTitle>
                <div className="flex items-center mt-2 space-x-2 flex-wrap">
                  <Badge variant="outline" className="text-muted-foreground">
                    {organization.category} / {organization.subCategory}
                  </Badge>
                  {organization.verified && (
                    <Badge variant="success" className="bg-success/10 text-success flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Verified
                    </Badge>
                  )}
                </div>
              </div>
              {renderRating(organization.rating?.averageRating)}
            </div>
          </CardHeader>

          {/* Content */}
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoSection
                icon={<Mail className="w-5 h-5 text-primary" />}
                title="Contact Information"
                items={[
                  { label: "Email", value: organization.email },
                  { label: "Phone", value: organization.phone || "—" },
                  organization.alternativePhone && { label: "Alternative Phone", value: organization.alternativePhone },
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
                title="Key People"
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

            <Separator className="my-6" />

            <div>
              <h3 className="text-lg font-semibold mb-3">Event Preferences</h3>
              <div className="flex flex-wrap gap-2">
                {organization.eventPreferences?.preferredEventTypes?.map((type) => (
                  <Badge key={type} variant="secondary">
                    {type}
                  </Badge>
                ))}
                <Badge
                  variant={organization.eventPreferences?.allowsPaidEvents ? "success" : "secondary"}
                >
                  {organization.eventPreferences?.allowsPaidEvents ? "Paid Events Allowed" : "Free Events Only"}
                </Badge>
              </div>
            </div>
          </CardContent>

          {/* Footer */}
          <CardFooter className="flex flex-wrap gap-4 justify-between items-center">
            <DynamicSocialLinks links={organization.socialLinks || {} } />
            <Button
              onClick={() => window.open(organization.website, "_blank")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Globe className="w-4 h-4 mr-2" />
              Visit Website
            </Button>
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

/* Dynamic Social Links */
const DynamicSocialLinks = ({ links }) => {
  const socialIcons = {
    facebook: <IconBrandFacebook className="w-5 h-5 text-blue-600" />,
    twitter: <IconBrandInstagram className="w-5 h-5 text-blue-400" />,
    linkedin: <IconBrandLinkedin className="w-5 h-5 text-blue-700" />,
    instagram: <IconBrandTwitter className="w-5 h-5 text-pink-500" />,
    youtube: <IconBrandYoutube className="w-5 h-5 text-red-600" />,
    blog: <IconGlobe className="w-5 h-5 text-gray-700" />,
  };

  return (
    <div className="flex gap-3">
      {Object.keys(socialIcons).map((key) => {
        const url = links[key];
        if (!url) return null;
        return (
          <Link
            key={key}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full hover:bg-muted transition-colors duration-200"
          >
            {socialIcons[key]}
          </Link>
        );
      })}
    </div>
  );
};
