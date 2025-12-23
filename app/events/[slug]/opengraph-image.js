import api from "@/lib/api";
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const contentType = "image/png";

export const size = {
  width: 1200,
  height: 630,
};

export default async function OGImage({ params }) {
  const { slug } =  await params;
  // const API = process.env.NEXT_PUBLIC_API_URL;

  let event = null;

  // -----------------------------
  // Fetch event data
  // -----------------------------
  try {
    // const res = await fetch(`${API}/event/${slug}`, {
    //   cache: "no-store",
    // });
    const res = await api.get(`/event/${slug}`);

    if (res.ok) {
      const json = await res.json();
      event = json?.data?.event || json?.event || null;
    }
  } catch {
    event = null;
  }

  const title = event?.title || "Orgatick Event";
  const bannerImage = event?.bannerImage || null;

  // =====================================================
  // CASE 1 → Event banner exists (BEST CASE)
  // =====================================================
  if (bannerImage) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "1200px",
            height: "630px",
            position: "relative",
            display: "flex",
            alignItems: "flex-end",
            // padding: "px",
            color: "white",
            fontFamily: "Arial, Helvetica, sans-serif",
          }}
        >
          {/* Banner Image */}
          <img
            src={bannerImage}
            alt={title}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />

          {/* Gradient Overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(0,0,0,0.75), rgba(0,0,0,0.15))",
            }}
          />

          {/* Branding */}
          <div
            style={{
              position: "relative",
              fontSize: 28,
              fontWeight: 600,
              opacity: 0.95,
            }}
          >
            Powered by Orgatick
          </div>
        </div>
      ),
      size
    );
  }

  // =====================================================
  // CASE 2 → Banner missing → Fallback OG
  // =====================================================
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "linear-gradient(135deg, #0b3c5d, #1e6091)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          color: "white",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 900,
            lineHeight: 1.1,
            maxWidth: "900px",
          }}
        >
          {title}
        </div>

        <div
          style={{
            fontSize: 32,
            marginTop: "40px",
            opacity: 0.9,
          }}
        >
          Powered by Orgatick
        </div>
      </div>
    ),
    size
  );
}
