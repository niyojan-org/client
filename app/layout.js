import "./globals.css";
import ClientLayout from "./ClientLayout";
import { Toaster } from "@/components/ui/sonner";
// import { LoaderProvider } from "@/components/LoaderContext";
import { Source_Code_Pro, Source_Sans_3 } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import ProvidersSwr from "@/components/ProvidersSwr";
import { Analytics } from "@vercel/analytics/next";

import Head from "next/head";
// Fonts
const sourceCodePro = Source_Code_Pro({
  variable: "--font-source-code-pro",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const sourceSans3 = Source_Sans_3({
  variable: "--font-source-sans-3",
  subsets: ["latin"],
  display: "swap",
});

/* ------------------------------------------
   FIXED: MOVE THESE OUT OF metadata
------------------------------------------ */
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const themeColor = "#ffffff";

/* ------------------------------------------
   GLOBAL SEO
------------------------------------------ */
export const metadata = {
  metadataBase: new URL("https://iamabhi.me"),

  title: {
    default: "orgatick",
    template: "%s | orgatick",
  },

  description:
    "orgatick simplifies college event management with secure ticketing, organizer tools, analytics, and real-time updates.",

  keywords: [
    "orgatick",
    "event management",
    "ticket booking",
    "college events",
    "esports events",
    "tech events",
    "fest management",
    "event hosting platform",
  ],

  applicationName: "orgatick",
  generator: "Next.js",
  category: "Events",
  creator: "orgatick Team",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "orgatick",
    description:
      "Effortlessly host and attend events with ticketing, analytics & payments.",
    url: "https://iamabhi.me",
    siteName: "orgatick",
    locale: "en_IN",
    type: "website",
    images: ["https://iamabhi.me/og_image.png"],
  },

  twitter: {
    card: "summary_large_image",
    title: "orgatick",
    description: "A modern event hosting & ticketing platform.",
    images: ["https://iamabhi.me/og_image.png"],
    site: "@orgatick",
    creator: "@orgatick",
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  alternates: {
    canonical: "https://iamabhi.me",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={[sourceCodePro.variable, sourceSans3.variable].join(" ")}
      suppressHydrationWarning
    >
      {/* google site verification */}
      <head>
        <meta name="google-site-verification" content="k4YccptuL7MdOxpNTt0698j3qTFKSDVwMjg9RlqjRQs" />
      </head>


      <body
        className="relative antialiased"
        style={{ fontFamily: "var(--font-source-sans-3)" }}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* <LoaderProvider> */}
            <ClientLayout>{children}</ClientLayout>
            <Toaster />
            <Analytics />
          {/* </LoaderProvider> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
