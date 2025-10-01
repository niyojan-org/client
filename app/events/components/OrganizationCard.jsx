"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  IconShield, 
  IconCheck, 
  IconExternalLink,
  IconBuildingBank,
  IconMail,
  IconPhone,
  IconWorld,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconBrandYoutube,
  IconNews
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const socialIcons = {
  facebook: IconBrandFacebook,
  instagram: IconBrandInstagram,
  linkedin: IconBrandLinkedin,
  twitter: IconBrandTwitter,
  youtube: IconBrandYoutube,
  blog: IconNews,
  website: IconWorld
};

export default function OrganizationCard({ event }) {
  if (!event?.organization) return null;

  const org = event.organization;
  
  // Filter out empty social links
  const socialLinks = org.socialLinks ? Object.entries(org.socialLinks).filter(([key, value]) => value && value.trim()) : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <Card className="hover:shadow-lg transition-all duration-300 gap-1">
        {/* Mobile and Tablet Layout (sm and below) */}
        <div className="lg:hidden">
          <CardHeader className="">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-xl font-bold text-foreground flex items-center gap-1">
                  <IconBuildingBank className="h-5 w-5 text-primary" />
                  {org.name || "Organization"}
                </CardTitle>
                <CardDescription className="mt-1 text-sm text-muted-foreground">
                  Organized by
                </CardDescription>
              </div>
              {org.verified && (
                <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                  <IconCheck className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              )}
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Category */}
            {org.category && (
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="capitalize">
                  {org.category}
                </Badge>
              </div>
            )}

            {/* Contact Information */}
            <div className="space-y-2">
              {org.email && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <IconMail className="h-4 w-4" />
                  <span className="truncate">{org.email}</span>
                </div>
              )}
              
              {org.phone && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <IconPhone className="h-4 w-4" />
                  <span>{org.phone}</span>
                </div>
              )}

              {org.website && (
                <div className="flex items-center gap-2 text-sm">
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
                    const IconComponent = socialIcons[platform] || IconWorld;
                    
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
                          className="h-8 w-8 p-0 hover:scale-105 transition-transform"
                        >
                          <IconComponent className="h-4 w-4" />
                          <span className="sr-only">{platform}</span>
                        </Button>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* View Organization Profile */}
            {org.slug && (
              <div className="pt-2">
                <Button asChild variant="default" size="sm" className="w-full">
                  <Link href={`/org/${org.slug}`}>
                    <IconExternalLink className="h-4 w-4 mr-2" />
                    View Organization
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
        </div>

        {/* Desktop Layout (lg and above) - Horizontal */}
        <div className="hidden lg:block">
          <CardContent className="">
            <div className="flex items-center justify-between gap-8">
              {/* Left Section - Organization Info */}
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <IconBuildingBank className="h-6 w-6 text-primary" />
                      <CardTitle className="text-2xl font-bold text-foreground">
                        {org.name || "Organization"}
                      </CardTitle>
                      {org.verified && (
                        <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                          <IconCheck className="h-4 w-4 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    <CardDescription className="text-base text-muted-foreground">
                      Organized by
                    </CardDescription>
                  </div>
                </div>

                {/* Category and Contact Info in Rows */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    {org.category && (
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="capitalize">
                          {org.category}
                        </Badge>
                      </div>
                    )}

                    {org.email && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <IconMail className="h-4 w-4" />
                        <span className="truncate">{org.email}</span>
                      </div>
                    )}
                    
                    {org.phone && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <IconPhone className="h-4 w-4" />
                        <span>{org.phone}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    {org.website && (
                      <div className="flex items-center gap-2 text-sm">
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

                    {/* Social Links */}
                    {socialLinks.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-muted-foreground">Social Media</h4>
                        <div className="flex flex-wrap gap-2">
                          {socialLinks.map(([platform, url]) => {
                            const IconComponent = socialIcons[platform] || IconWorld;
                            
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
                                  className="h-8 w-8 p-0 hover:scale-105 transition-transform"
                                >
                                  <IconComponent className="h-4 w-4" />
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

              {/* Right Section - Action Button */}
              {org.slug && (
                <div className="flex-shrink-0">
                  <Button asChild variant="default" size="default" className="min-w-[160px]">
                    <Link href={`/org/${org.slug}`}>
                      <IconExternalLink className="h-4 w-4 mr-2" />
                      View Organization
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </div>
      </Card>
    </motion.div>
  );
}
