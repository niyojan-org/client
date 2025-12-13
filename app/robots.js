export default function robots() {
  const baseUrl = "https://orgatick.in";

  return {
    rules: [
      {
        userAgent: "*",
        disallow: [
          "/admin",
          "/dashboard",
          "/api",
          "/private",
          "/auth",
          "/profile",
          "/payment",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
