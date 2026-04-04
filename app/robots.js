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
          "/login",
          "/signup",
          "/change-password",
          "/verify-email",
          "/reset-password",
          "/mfa",
          "/oauth-success",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
