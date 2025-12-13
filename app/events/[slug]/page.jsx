import api from "@/lib/api";
import Error404 from "@/app/not-found";
import EventPageClient from "./page.client";

// =========================
// DYNAMIC SEO METADATA
// =========================
export async function generateMetadata({ params }) {
  const { slug } =  await params;  

  try {
    const { data } = await api.get(`/event/${slug}`);
    const event = data?.event;

    if (!event) {
      return {
        title: "Event Not Found | orgatick",
        description: "The event you are looking for does not exist.",
      };
    }

    return {
      title: `${event.title} `,
      description: event.shortDescription || event.description,
      alternates: {
        canonical: `https://orgatick.in/events/${slug}`,
      },
      openGraph: {
        title: event.title,
        description: event.shortDescription || event.description,
        images: [`https://orgatick.in/events/${slug}/opengraph-image`],
        url: `https://orgatick.in/events/${slug}`,
      },
      twitter: {
        card: "summary_large_image",
        title: event.title,
        description: event.shortDescription || event.description,
        images: [`https://orgatick.in/events/${slug}/opengraph-image`],
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
            name: event.organization?.name || "orgatick Organizer",
            url: `https://orgatick.in/organization/${event.organization?.slug}`
          },
          location: {
            "@type": "Place",
            name: event.locationName || "Venue",
            address: event.location
          },
          url: `https://orgatick.in/events/${slug}`,
        },
      },
    };
  } catch {
    return {
      title: "Event",
      description: "Event details and information.",
    };
  }
}


// =========================
// PAGE COMPONENT (SSR + CLIENT WRAPPER)
// =========================
export default async function EventPage({ params }) {
  const { slug } = await params;

  try {
    const { data } = await api.get(`/event/${slug}`);
    const event = data?.event;

    if (!event) {
      return <div>Event Not Found</div>;
    }

    return <EventPageClient initialEvent={event} />;
  } catch {
    return <Error404 />
  }
}
