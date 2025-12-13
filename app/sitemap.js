export default async function sitemap() {
  const API = process.env.NEXT_PUBLIC_API_URL || "https://api.orgatick.in";
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://orgatick.in";

  async function fetchSafe(url, field) {
    try {
      const r = await fetch(url, { next: { revalidate: 300 } });
      if (!r.ok) return [];
      const json = await r.json();
      return json?.data?.[field] || [];
    } catch {
      return [];
    }
  }

  const events = await fetchSafe(`${API}/event`, "events");
  const orgs = await fetchSafe(`${API}/org/public`, "organizations");

  const staticPages = [
    { url: `${base}`, priority: 1.0 },
    { url: `${base}/events`, priority: 0.9 },
    { url: `${base}/organization`, priority: 0.9 },
    { url: `${base}/about`, priority: 0.7 },
    { url: `${base}/features`, priority: 0.7 },
    { url: `${base}/contact`, priority: 0.6 },
    { url: `${base}/privacy-policy`, priority: 0.4 },
    { url: `${base}/refund-policy`, priority: 0.4 },
    { url: `${base}/terms-and-conditions`, priority: 0.4 },
    { url: `${base}/delivery-policy`, priority: 0.4 },
  ].map((p) => ({
    ...p,
    lastModified: new Date(),
    changeFrequency: "monthly",
  }));

  const dynamicEvents = events.map((e) => ({
    url: `${base}/events/${e.slug}`,
    lastModified: new Date(e.updatedAt || Date.now()),
    changeFrequency: "daily",
    priority: 1.0,
  }));

  const dynamicOrgs = orgs.map((o) => ({
    url: `${base}/organization/${o.slug}`,
    lastModified: new Date(o.updatedAt || Date.now()),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [...staticPages, ...dynamicEvents, ...dynamicOrgs];
}
