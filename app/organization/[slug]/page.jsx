import api from "@/lib/api";
import OrganizationPageClient from "./page.client";
import Error404 from "@/app/not-found";

// ========== DYNAMIC SEO ========== //
export async function generateMetadata({ params }) {
  const { slug } = await params;

  try {
    const res = await api.get(`/org/public/${slug}`);
    const org = res.data.organization;

    if (!org) {
      return {
        title: "Organization Not Found | Orgatick",
        description: "This organization does not exist on Orgatick.",
      };
    }

    const ogImage = `https://orgatick.in/organization/${slug}/opengraph-image`;

    return {
      title: `${org.name}`,
      description: `${org.name} is a ${org.category}${
        org.subCategory ? ` in ${org.subCategory}` : ""
      }. View organization details, contact information, and hosted events on Orgatick.`,

      alternates: {
        canonical: `https://orgatick.in/organization/${slug}`,
      },

      openGraph: {
        title: org.name,
        description:
          org.description ||
          `Learn more about ${org.name}, including events and organization details on Orgatick.`,
        url: `https://orgatick.in/organization/${slug}`,
        siteName: "Orgatick",
        type: "website",
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: `${org.name} on Orgatick`,
          },
        ],
      },

      twitter: {
        card: "summary_large_image",
        title: org.name,
        description:
          org.description ||
          `Official organization page of ${org.name} on Orgatick.`,
        images: [ogImage],
      },
    };
  } catch {
    return {
      title: "Organization",
      description: "View organization details and events on Orgatick.",
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

    return <OrganizationPageClient initialOrg={organization} />;
  } catch {
    return <Error404 />
  }
}
