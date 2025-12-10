import api from "@/lib/api";
import ClientOrganizationPage from "./ClientOrganizationPage";
import Error404 from "@/app/not-found";

// ========== DYNAMIC SEO ========== //
export async function generateMetadata({ params }) {
  const { slug } = await params;

  try {
    const res = await api.get(`/org/public/${slug}`);
    const org = res.data.organization;

    if (!org) {
      return {
        title: "Organization Not Found | orgatick",
        description: "This organization does not exist on orgatick.",
      };
    }

    const ogImage = org.bannerImage || org.logo || "https://orgatick.in/og_image.png";

    return {
      title: `${org.name} | orgatick`,
      description:
        `${org.name} • ${org.category} / ${org.subCategory}. ` +
        `Trusted and Loved by many students.`,

      alternates: {
        canonical: `https://orgatick.in/organization/${slug}`,
      },

      openGraph: {
        title: org.name,
        description:
          org.description || `Learn more about ${org.name} on orgatick.`,
        url: `https://orgatick.in/organization/${slug}`,
        images: [ogImage],
        type: "website",
      },

      twitter: {
        card: "summary_large_image",
        title: org.name,
        description: org.description || `Organization page for ${org.name}.`,
        images: [ogImage],
      },

      other: {
        "script:ld+json": {
          "@context": "https://schema.org",
          "@type": "Organization",
          name: organization.name,
          description: `${organization.name} - ${organization.category} / ${organization.subCategory}`,
          url: `https://orgatick.in/organization/${slug}`,
          logo: organization.logo || "/org_logo_default.png",
          sameAs: Object.values(organization.socialLinks || {}).filter(Boolean),
          address: {
            "@type": "PostalAddress",
            streetAddress: organization.address?.street,
            addressLocality: organization.address?.city,
            addressRegion: organization.address?.state,
            postalCode: organization.address?.zipCode,
            addressCountry: organization.address?.country,
          },
        },
      },
    };
  } catch {
    return {
      title: "Organization",
      description: "View organization details and events.",
    };
  }
}

// next js viewport settings
export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff", // you can change color
};


// ========== SSR PAGE ========== //
export default async function OrgPage({ params }) {
  const { slug } = await params;

  try {
    const res = await api.get(`/org/public/${slug}`);
    const organization = res.data.organization;

    if (!organization) {
      return <div className="p-10 text-center">Organization not found.</div>;
    }

    return <ClientOrganizationPage initialOrg={organization} />;
  } catch {
    return <Error404 />
  }
}
