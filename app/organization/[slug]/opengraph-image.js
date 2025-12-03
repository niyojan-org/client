import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage({ params }) {
  const { slug } = params; // FIXED
  const API = process.env.NEXT_PUBLIC_API_URL;

  let org = null;

  try {
    const res = await fetch(`${API}/org/public/${slug}`, { cache: "force-cache" });
    const json = await res.json();
    org = json.organization || json.data?.organization;
  } catch (e) {
    console.error("OG fetch error:", e);
    org = null;
  }

  const title = org?.name || "Organization | orgatick";

  const banner =
    org?.bannerImage ||
    org?.logo ||
    "https://iamabhi.me/og_image.png";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "40px",
          fontFamily: "sans-serif",
          color: "white",
          textShadow: "0 4px 16px rgba(0,0,0,0.8)",
          backgroundImage: `url(${banner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* DARK OVERLAY */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(0deg, rgba(0,0,0,0.75), rgba(0,0,0,0.2))",
          }}
        />

        <div style={{ position: "relative", zIndex: 10 }}>
          <div style={{ fontSize: 78, fontWeight: 900, maxWidth: "90%", lineHeight: 1.1 }}>
            {title}
          </div>

          {org?.verified && (
            <div style={{ marginTop: 12, fontSize: 28, opacity: 0.9 }}>
              ✓ Verified Organization
            </div>
          )}

          {org?.category && (
            <div style={{ marginTop: 8, fontSize: 26, opacity: 0.8 }}>
              {org.category} · {org.subCategory}
            </div>
          )}
        </div>
      </div>
    ),
    size
  );
}
