"use client";

import { useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import {
  IconMail,
  IconPhone,
  IconWorld,
  IconMapPin,
  IconStar,
  IconCalendarEvent,
  IconShieldCheck,
  IconBrandFacebook,
  IconBrandTwitter,
  IconBrandInstagram,
  IconBuilding,
  IconUser,
  IconChevronRight,
  IconExternalLink
} from "@tabler/icons-react";

export default function OrganizationPageClient({ initialOrg }) {
  const organization = initialOrg;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [organization.slug]);

  const getInitials = (name) => {
    return name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <main className="h-full pb-8">
      <div className="mx-auto space-y-2">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground my-3">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <IconChevronRight className="size-4" />
          <Link href="/organization" className="hover:text-foreground transition-colors">
            Organizations
          </Link>
          <IconChevronRight className="size-4" />
          <span className="text-foreground font-medium">{organization.name}</span>
        </nav>

        {/* Header Card */}
        <Card className="px-0 md:p-4 p-2">
          <div className="flex gap-6 items-center sm:items-start">
            {/* Logo */}
            <Avatar className="size-20 sm:size-24 border-2">
              <AvatarImage src={organization.logo} alt={organization.name} />
              <AvatarFallback className="text-2xl font-bold bg-primary/10">
                {getInitials(organization.name)}
              </AvatarFallback>
            </Avatar>

            {/* Info */}
            <div className="flex-1 space-y-3">
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <h1 className="text-2xl sm:text-3xl font-bold">{organization.name}</h1>
                  {organization.verified && (
                    <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20 shrink-0">
                      <IconShieldCheck className="size-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>

                {organization.description && (
                  <p className="text-muted-foreground text-sm sm:text-base">
                    {organization.description}
                  </p>
                )}
              </div>

              {/* Categories & Rating */}
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary">
                  <IconBuilding className="size-3 mr-1" />
                  {organization.category}
                </Badge>
                {organization.subCategory && (
                  <Badge variant="outline">{organization.subCategory}</Badge>
                )}
                {organization.rating?.averageRating && (
                  <div className="flex items-center gap-1 text-sm">
                    <IconStar className="size-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{organization.rating.averageRating}</span>
                    <span className="text-muted-foreground">
                      ({organization.rating.totalRatings})
                    </span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2">
                {organization.website && (
                  <Button size="sm" onClick={() => window.open(organization.website, "_blank")}>
                    <IconWorld className="size-4" />
                    Visit Website
                    <IconExternalLink className="size-3" />
                  </Button>
                )}

                {/* Social Links */}
                {organization.socialLinks?.facebook && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => window.open(organization.socialLinks.facebook, "_blank")}
                  >
                    <IconBrandFacebook className="size-4" />
                  </Button>
                )}
                {organization.socialLinks?.twitter && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => window.open(organization.socialLinks.twitter, "_blank")}
                  >
                    <IconBrandTwitter className="size-4" />
                  </Button>
                )}
                {organization.socialLinks?.instagram && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => window.open(organization.socialLinks.instagram, "_blank")}
                  >
                    <IconBrandInstagram className="size-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Stats Card */}
        {organization.stats && (
          <Card className='gap-0 p-2 sm:p-4 px-0'>
            <CardHeader>
              <CardTitle className="text-lg">Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {organization.stats.totalEventsHosted !== undefined && (
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <IconCalendarEvent className="size-4" />
                      <span>Events Hosted</span>
                    </div>
                    <p className="text-2xl font-bold">{organization.stats.totalEventsHosted}</p>
                  </div>
                )}
                {organization.stats.totalTicketsSold !== undefined && (
                  <div className="space-y-1">
                    <p className="text-muted-foreground text-sm">Tickets Sold</p>
                    <p className="text-2xl font-bold">{organization.stats.totalTicketsSold}</p>
                  </div>
                )}
                {organization.stats.totalWarnings !== undefined && (
                  <div className="space-y-1">
                    <p className="text-muted-foreground text-sm">Warnings</p>
                    <p className="text-2xl font-bold">{organization.stats.totalWarnings}</p>
                  </div>
                )}
                {organization.stats.totalBlockedEvents !== undefined && (
                  <div className="space-y-1">
                    <p className="text-muted-foreground text-sm">Blocked</p>
                    <p className="text-2xl font-bold">{organization.stats.totalBlockedEvents}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Contact & Location */}
        <div className="grid sm:grid-cols-2 gap-2 sm:gap-6">
          {/* Contact Information */}
          <Card className="px-0 sm:p-4 gap-0 p-2">
            <CardHeader className="p-0 ml-3">
              <CardTitle className="text-lg">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 p-0">
              {organization.supportContact?.email && (
                <a
                  href={`mailto:${organization.supportContact.email}`}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors group"
                >
                  <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <IconMail className="size-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="font-medium truncate">{organization.supportContact.email}</p>
                  </div>
                </a>
              )}

              {organization.supportContact?.phone && (
                <a
                  href={`tel:${organization.supportContact.phone}`}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors group"
                >
                  <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <IconPhone className="size-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">Phone</p>
                    <p className="font-medium">{organization.supportContact.phone}</p>
                  </div>
                </a>
              )}

              {organization.admin && (
                <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/50">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <IconUser className="size-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">Admin</p>
                    <p className="font-medium">{organization.admin.name}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Location */}
          {organization.address && (
            <Card className="px-0 sm:p-4 gap-0 p-2">
              <CardHeader className="p-0 ml-3">
                <CardTitle className="text-lg">Location</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-accent/50">
                  <div className="bg-primary/10 p-2 rounded-lg shrink-0">
                    <IconMapPin className="size-4 text-primary" />
                  </div>
                  <div className="space-y-1">
                    {organization.address.street && (
                      <p className="font-medium">{organization.address.street}</p>
                    )}
                    <p className="text-sm text-muted-foreground">
                      {[
                        organization.address.city,
                        organization.address.state,
                        organization.address.zipCode,
                      ]
                        .filter(Boolean)
                        .join(", ")}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Event Preferences */}
        {organization.eventPreferences && (
          <Card className="px-0 sm:p-4 gap-0 p-2">
            <CardHeader className="p-0 ml-3">
              <CardTitle className="text-lg">Event Preferences</CardTitle>
              <CardDescription>Types of events this organization hosts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 pl-3 mt-2">
              {organization.eventPreferences.preferredEventTypes && (
                <div className="flex flex-wrap gap-2">
                  {organization.eventPreferences.preferredEventTypes.map((type, index) => (
                    <Badge key={index} variant="outline">
                      {type}
                    </Badge>
                  ))}
                </div>
              )}
              {organization.eventPreferences.allowsPaidEvents !== undefined && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <IconCalendarEvent className="size-4" />
                  <span>
                    {organization.eventPreferences.allowsPaidEvents
                      ? "Hosts both free and paid events"
                      : "Hosts free events only"}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}
