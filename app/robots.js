export default function robots() {
  const baseUrl = "https://iamabhi.me";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/dashboard",
          "/api",       // protect backend APIs
          "/private",
          "/_next",     // avoid crawlers indexing assets
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
