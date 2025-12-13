"use client";

import { useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Star, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function OrganizationPageClient({ initialOrg }) {
  const organization = initialOrg;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [organization.slug]);

  const renderField = (label, value, highlight = false) => (
    <div className="space-y-1 p-3 rounded-lg bg-muted/30">
      <p className="text-xs font-medium text-muted-foreground uppercase">{label}</p>
      <p className={highlight ? "text-primary font-bold" : ""}>{value || "—"}</p>
    </div>
  );

  const renderRating = (rating) => (
    <div className="flex items-center gap-1">
      <Star className="w-4 h-4 fill-yellow-400" />
      <span>{rating ?? 0}</span>
    </div>
  );

  return (
    <main className="pt-5 px-6 md:px-16 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-6">

        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-5 rounded-xl">
          <p className="text-sm mb-2">
            <Link href="/">Home</Link> / <Link href="/organization">Organizations</Link> /
            <span className="font-semibold">{organization.slug}</span>
          </p>

          <h1 className="text-4xl font-bold">{organization.name}</h1>

          <div className="mt-3 flex items-center gap-3">
            <Badge variant="outline">{organization.category}</Badge>
            {organization.verified && <Badge className="bg-green-500/10 text-green-600">✓ Verified</Badge>}
            {renderRating(organization.rating?.averageRating)}
          </div>
        </div>

        <Card className="border-2 shadow-xl">
          <CardHeader>
            <CardTitle>About the Organization</CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {renderField("Email", organization.email, true)}
              {renderField("Phone", organization.phone)}
              {organization.alternativePhone && renderField("Alt Phone", organization.alternativePhone)}
            </div>

            {organization.address && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {renderField("City", organization.address.city)}
                {renderField("State", organization.address.state)}
                {renderField("Country", organization.address.country)}
              </div>
            )}

            {organization.stats && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {renderField("Events", organization.stats.totalEventsHosted)}
                {renderField("Tickets", organization.stats.totalTicketsSold)}
                {renderField("Warnings", organization.stats.totalWarnings)}
                {renderField("Blocked", organization.stats.totalBlockedEvents)}
              </div>
            )}
          </CardContent>

          <CardFooter>
            <button
              onClick={() => window.open(organization.website, "_blank")}
              className="px-4 py-2 bg-primary text-white rounded-lg flex items-center gap-2"
            >
              <Globe className="w-4 h-4" /> Visit Website
            </button>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
