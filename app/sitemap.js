export default async function sitemap() {
  const API = process.env.NEXT_PUBLIC_API_URL || "https://api.iamabhi.me";
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://iamabhi.me";

  async function fetchSafe(url, field) {
    try {
      const r = await fetch(url, { next: { revalidate: 60 } });
      if (!r.ok) return [];

      const json = await r.json();
      return json?.data?.[field] || [];
    } catch {
      return [];
    }
  }

  // === Fetch Events ===
  const events = await fetchSafe(`${API}/event`, "events");

  // === Fetch Organizations ===
  const orgs = await fetchSafe(`${API}/org/public`, "organizations");

  // === STATIC PAGES ===
  const staticPages = [
    "",
    "events",
    "organization",
    "about",
    "contact",
    "features",
    "privacy-policy",
    "refund-policy",
    "terms-and-conditions",
  ].map((page) => ({
    url: `${base}/${page}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // === EVENT PAGES ===
  const dynamicEvents = events.map((e) => ({
    url: `${base}/events/${e.slug}`,
    lastModified: new Date(e.updatedAt || Date.now()),
    changeFrequency: "daily",
    priority: 1.0,
  }));

  // === EVENT REGISTRATION PAGES ===
  const dynamicRegistrations = events.map((e) => ({
    url: `${base}/events/${e.slug}/registration`,
    lastModified: new Date(e.updatedAt || Date.now()),
    changeFrequency: "daily",
    priority: 0.8,
  }));

  // === ORGANIZATION PAGES ===
  const dynamicOrgs = orgs.map((o) => ({
    url: `${base}/organization/${o.slug}`,
    lastModified: new Date(o.updatedAt || Date.now()),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [
    ...staticPages,
    ...dynamicEvents,
    ...dynamicRegistrations,
    ...dynamicOrgs,
  ];
}
