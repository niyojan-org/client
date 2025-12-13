import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage({ params }) {
  const { slug } = await params;

  let title = "Organization";
  let category = "";
  let logoBuffer = null;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/org/public/${slug}`,
      { cache: "no-store" }
    );
    const json = await res.json();
    const org = json.organization || json.data?.organization;

    if (org) {
      title = org.name;
      category = org.category || "";

      // 👉 Try loading logo ONLY if exists
      if (org.logo) {
        try {
          const imgRes = await fetch(org.logo);
          const contentType = imgRes.headers.get("content-type") || "";

          // Allow ONLY png/jpg
          if (
            contentType.includes("png") ||
            contentType.includes("jpeg") ||
            contentType.includes("jpg")
          ) {
            logoBuffer = await imgRes.arrayBuffer();
          }
        } catch {
          logoBuffer = null;
        }
      }
    }
  } catch {
    // silent fail
  }

  /* ----------------------------------
     CASE 1: LOGO AVAILABLE (PNG/JPG)
  ---------------------------------- */
  if (logoBuffer) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            position: "relative",
            backgroundColor: "#020617",
            color: "#ffffff",
          }}
        >
          {/* Logo */}
          <img
            alt="opengraph-image"
            src={logoBuffer}
            width="220"
            height="220"
            style={{
              position: "absolute",
              top: 48,
              right: 48,
              objectFit: "contain",
            }}
          />

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ fontSize: 72, fontWeight: 800, lineHeight: 1.1 }}>
              {title}
            </div>

            {category && (
              <div style={{ fontSize: 28, opacity: 0.85 }}>
                {category}
              </div>
            )}

            <div style={{ fontSize: 22, opacity: 0.7 }}>
              Powered by Orgatick
            </div>
          </div>
        </div>
      ),
      size
    );
  }

  /* ----------------------------------
     CASE 2: FALLBACK (NO / BAD LOGO)
  ---------------------------------- */
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 48,
          backgroundColor: "#0f172a",
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.1 }}>
            {title}
          </div>

          {category && (
            <div style={{ fontSize: 28, opacity: 0.85 }}>
              {category}
            </div>
          )}

          <div style={{ fontSize: 22, opacity: 0.7 }}>
            Powered by Orgatick
          </div>
        </div>
      </div>
    ),
    size
  );
}
