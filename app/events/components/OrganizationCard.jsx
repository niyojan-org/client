"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  IconBuildingBank,
  IconCheck,
  IconExternalLink,
  IconMail,
  IconPhone,
  IconWorld,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconBrandYoutube,
  IconNews,
} from "@tabler/icons-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Map of platform → icon component
/** @type {Record<string, React.ElementType>} */
const socialIcons = {
  facebook: IconBrandFacebook,
  instagram: IconBrandInstagram,
  linkedin: IconBrandLinkedin,
  twitter: IconBrandTwitter,
  youtube: IconBrandYoutube,
  blog: IconNews,
  website: IconWorld,
};

/** @param {Object} props
 *  @param {any} props.event
 */
export default function OrganizationCard({ event }) {
  if (!event?.organization) return null;

  const org = event.organization;

  // Filter only valid links
  const socialLinks =
    org.socialLinks && typeof org.socialLinks === "object"
      ? Object.entries(org.socialLinks).filter(([_, value]) => value && value.trim())
      : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="w-full"
    >
      <Card className="border-t-4 border-t-primary shadow-md hover:shadow-lg transition-all duration-300">
        {/* -------- Mobile / Tablet Layout -------- */}
        <div className="lg:hidden">
          <CardHeader>
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                  <motion.div whileHover={{ scale: 1.05 }} className="text-primary">
                    <IconBuildingBank className="h-5 w-5" />
                  </motion.div>
                  {org.name || "Organization"}
                </CardTitle>
                <CardDescription className="mt-1 text-sm text-muted-foreground">
                  Organized by
                </CardDescription>
              </div>

              {org.verified && (
                <Badge
                  variant="secondary"
                  className="flex items-center gap-1 bg-green-100 text-green-700 border-green-200"
                >
                  <IconCheck className="h-3 w-3" />
                  Verified
                </Badge>
              )}
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Category */}
            {org.category && (
              <Badge variant="outline" className="capitalize">
                {org.category}
              </Badge>
            )}

            {/* Contact */}
            <div className="space-y-2 text-sm">
              {org.email && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <IconMail className="h-4 w-4" />
                  <span className="truncate">{org.email}</span>
                </div>
              )}
              {org.phone && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <IconPhone className="h-4 w-4" />
                  <span>{org.phone}</span>
                </div>
              )}
              {org.website && (
                <div className="flex items-center gap-2">
                  <IconWorld className="h-4 w-4 text-muted-foreground" />
                  <Link
                    href={org.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline truncate"
                  >
                    Visit Website
                  </Link>
                </div>
              )}
            </div>

            {/* Social Links */}
            {socialLinks.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-muted-foreground">Social Media</h4>
                <div className="flex flex-wrap gap-2">
                  {socialLinks.map(([platform, url]) => {
                    const Icon = socialIcons[platform] || IconWorld;
                    return (
                      <Link
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group"
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0 hover:scale-110 transition-transform"
                        >
                          <Icon className="h-4 w-4" />
                          <span className="sr-only">{platform}</span>
                        </Button>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* View Organization */}
            {org.slug && (
              <Button
                asChild
                size="sm"
                className="w-full bg-gradient-to-r from-primary to-primary/90 text-primary-foreground hover:from-primary/90 hover:to-primary shadow-md hover:shadow-lg transition-all duration-300"
              >
                <Link href={`/org/${org.slug}`}>
                  <IconExternalLink className="h-4 w-4 mr-2" />
                  View Organization
                </Link>
              </Button>
            )}
          </CardContent>
        </div>

        {/* -------- Desktop Layout -------- */}
        <div className="hidden lg:block">
          <CardContent>
            <div className="flex items-start justify-between gap-8">
              {/* Left Section */}
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-3">
                  <motion.div whileHover={{ scale: 1.05 }} className="text-primary">
                    <IconBuildingBank className="h-6 w-6" />
                  </motion.div>
                  <CardTitle className="text-2xl font-bold text-foreground">
                    {org.name || "Organization"}
                  </CardTitle>
                  {org.verified && (
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1 bg-green-100 text-green-700 border-green-200"
                    >
                      <IconCheck className="h-4 w-4" />
                      Verified
                    </Badge>
                  )}
                </div>
                <CardDescription className="text-sm text-muted-foreground">
                  Organized by
                </CardDescription>

                {/* Contact / Category */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                  <div className="space-y-3 text-sm">
                    {org.category && (
                      <Badge variant="outline" className="capitalize">
                        {org.category}
                      </Badge>
                    )}
                    {org.email && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <IconMail className="h-4 w-4" />
                        <span className="truncate">{org.email}</span>
                      </div>
                    )}
                    {org.phone && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <IconPhone className="h-4 w-4" />
                        <span>{org.phone}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3 text-sm">
                    {org.website && (
                      <div className="flex items-center gap-2">
                        <IconWorld className="h-4 w-4 text-muted-foreground" />
                        <Link
                          href={org.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline truncate"
                        >
                          Visit Website
                        </Link>
                      </div>
                    )}
                    {socialLinks.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-muted-foreground">Social Media</h4>
                        <div className="flex flex-wrap gap-2">
                          {socialLinks.map(([platform, url]) => {
                            const Icon = socialIcons[platform] || IconWorld;
                            return (
                              <Link
                                key={platform}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-8 w-8 p-0 hover:scale-110 transition-transform"
                                >
                                  <Icon className="h-4 w-4" />
                                  <span className="sr-only">{platform}</span>
                                </Button>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Section */}
              {org.slug && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex-shrink-0"
                >
                  <Button
                    asChild
                    className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground hover:from-primary/90 hover:to-primary shadow-md hover:shadow-lg transition-all duration-300 min-w-[160px]"
                  >
                    <Link href={`/org/${org.slug}`}>
                      <IconExternalLink className="h-4 w-4 mr-2" />
                      View Organization
                    </Link>
                  </Button>
                </motion.div>
              )}
            </div>
          </CardContent>
        </div>
      </Card>
    </motion.div>
  );
}
