import api from "@/lib/api";
import ClientEventPage from "./ClientEventsPage";

// =========================
// DYNAMIC SEO METADATA
// =========================
export async function generateMetadata({ params }) {
  const { slug } = params;  

  try {
    const { data } = await api.get(`/event/${slug}`);
    const event = data?.event;

    if (!event) {
      return {
        title: "Event Not Found | Orgatick",
        description: "The event you are looking for does not exist.",
      };
    }

    return {
      title: `${event.title} | Orgatick`,
      description: event.shortDescription || event.description,
      alternates: {
        canonical: `https://iamabhi.me/events/${slug}`,
      },
      openGraph: {
        title: event.title,
        description: event.shortDescription || event.description,
        images: [`https://iamabhi.me/events/${slug}/opengraph-image`],
        url: `https://iamabhi.me/events/${slug}`,
      },
      twitter: {
        card: "summary_large_image",
        title: event.title,
        description: event.shortDescription || event.description,
        images: [`https://iamabhi.me/events/${slug}/opengraph-image`],
      },
      other: {
        "script:ld+json": {
          "@context": "https://schema.org",
          "@type": "Event",
          name: event.title,
          description: event.shortDescription || event.description,
          image: [event.bannerImage || "/og_image.png"],
          startDate: event.startDate,
          endDate: event.endDate,
          eventStatus: "EventScheduled",
          eventAttendanceMode: "OnlineEventAttendanceMode",
          organizer: {
            "@type": "Organization",
            name: event.organization?.name || "Orgatick Organizer",
            url: `https://iamabhi.me/organization/${event.organization?.slug}`
          },
          location: {
            "@type": "Place",
            name: event.locationName || "Venue",
            address: event.location
          },
          url: `https://iamabhi.me/events/${slug}`,
        },
      },
    };
  } catch {
    return {
      title: "Event | Orgatick",
      description: "Event details and information.",
    };
  }
}

// // =========================
// // NEXT.JS 15 VIEWPORT EXPORT
// // =========================
// export const viewport = {
//   width: "device-width",
//   initialScale: 1,
//   themeColor: "#ffffff", // you can change color
// };

// =========================
// PAGE COMPONENT (SSR + CLIENT WRAPPER)
// =========================
export default async function EventPage({ params }) {
  const { slug } = params;

  try {
    const { data } = await api.get(`/event/${slug}`);
    const event = data?.event;

    if (!event) {
      return <div>Event Not Found</div>;
    }

    return <ClientEventPage initialEvent={event} />;
  } catch {
    return <div>Failed to load event.</div>;
  }
}
