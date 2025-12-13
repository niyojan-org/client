import "./globals.css";
import ClientLayout from "./ClientLayout";
import { Toaster } from "@/components/ui/sonner";
import {Source_Code_Pro, Source_Sans_3 } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SpeedInsights } from '@vercel/speed-insights/next';

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
  metadataBase: new URL("https://orgatick.in"),

  title: {
    default: "Orgatick – Event Hosting & Management Platform",
    template: "%s | Orgatick",
  },

  description:
    "Orgatick is a modern event hosting and management platform for colleges, communities, and organizations. Create events, manage registrations, send tickets, and track attendees easily.",

  keywords: [
    "orgatick",
    "event hosting platform",
    "event management software",
    "college events platform",
    "community events",
    "event registration system",
    "organizer tools",
    "event analytics",
  ],

  applicationName: "Orgatick",
  category: "Events",
  creator: "Orgatick Team",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    title: "Orgatick – Host & Manage Events Seamlessly",
    description:
      "Create and manage events with ease. Orgatick provides powerful tools for registrations, attendee tracking, and event operations.",
    url: "https://orgatick.in",
    siteName: "Orgatick",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://orgatick.in/og_image.png",
        width: 1200,
        height: 630,
        alt: "Orgatick – Event Hosting Platform",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Orgatick – Event Hosting Platform",
    description:
      "A modern platform to host and manage events with registrations, tickets, and analytics.",
    images: ["https://orgatick.in/og_image.png"],
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  alternates: {
    canonical: "https://orgatick.in",
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
            <ClientLayout>
              {children}
              
            </ClientLayout>
            <SpeedInsights />
            <Toaster />

        </ThemeProvider>
      </body>
    </html>
  );
}
