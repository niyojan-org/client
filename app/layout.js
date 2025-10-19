import "./globals.css";
import ClientLayout from "./ClientLayout";
import { Toaster } from "@/components/ui/sonner";
import { LoaderProvider } from "@/components/LoaderContext";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Source_Code_Pro, Source_Sans_3 } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";

// Primary Fonts
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

export const metadata = {
  title: "Orgatick",
  description:
    "Orgatick simplifies event management with secure ticketing, analytics, and real-time updates.",
  openGraph: {
    title: "Orgatick",
    description:
      "Effortlessly host and attend college events with ticketing, payments, analytics & more.",
    url: "https://orgatick.com",
    siteName: "Orgatick",
    locale: "en_IN",
    type: "website",
  },
  appleWebApp: { title: "Orgatick" },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={[sourceCodePro.variable, sourceSans3.variable].join(" ")} suppressHydrationWarning
    >
      <body
        className="relative antialiased min-h-dvh"
        style={{ fontFamily: "var(--font-source-sans-3)" }}
      >
        <ThemeProvider
          attribute="class"
          defaultThemes="system"
          enableSystem
          disableTransitionOnChange
        >
          <LoaderProvider>
            {/* Apply ScrollArea globally */}
            {/* <ScrollArea className="h-full w-full"> */}
              <ClientLayout>{children}</ClientLayout>
            {/* </ScrollArea> */}

            <Toaster />
          </LoaderProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
