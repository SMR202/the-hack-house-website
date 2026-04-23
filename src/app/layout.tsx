import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SmoothScroll } from "@/components/smooth-scroll";

export const metadata: Metadata = {
  title: "The Hack House — A Place to Explore, Create & Grow",
  description:
    "Workshops & summer camps packed with creativity, adventure, and fun for kids aged 5 to 14. Arts, cooking, science, sports, drama, and music.",
  authors: [{ name: "The Hack House" }],
  openGraph: {
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  other: {
    "theme-color": "#1A3C40",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@600;700;800;900&family=Inter:wght@400;500;600;700&display=swap"
        />
      </head>
      <body>
        <SmoothScroll>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
