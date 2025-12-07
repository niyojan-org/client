import { ImageResponse } from "next/og";

export const runtime = "edge";
export const contentType = "image/png";
export const size = {
  width: 1200,
  height: 630,
};

export default async function OGImage({ params }) {
  const slug = params.slug;

  const API = process.env.NEXT_PUBLIC_API_URL;

  let event = null;
  try {
    const res = await fetch(`${API}/event/${slug}`, {
      cache: "no-store",
    });
    const json = await res.json();
    event = json?.data?.event || json?.event;
  } catch {
    event = null;
  }

  const title = event?.title || "orgatick";

  const banner =
    event?.bannerImage ||
    "https://iamabhi.me/og_image.png";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "40px",
          backgroundImage: `url(${banner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          // color: "white",
          fontFamily: "Arial",
          // textShadow: "0px 4px 20px rgba(0,0,0,0.8)",
        }}
      >
        <div style={{ fontSize: 78, fontWeight: 900, maxWidth: "1000px" }}>
          {title}
        </div>
        <div style={{ fontSize: 32, marginTop: "20px", opacity: 0.8 }}>
          Powered by orgatick
        </div>
      </div>
    ),
    size
  );
}
