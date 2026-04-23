import type { Metadata } from "next";
import HomePageClient from "./home-client";

export const metadata: Metadata = {
  title: "The Hack House — A Place to Explore, Create & Grow",
  description:
    "Workshops & summer camps for kids aged 5–14. Arts, cooking, science, sports, drama, music — find their spark at The Hack House.",
  openGraph: {
    title: "The Hack House — A Place to Explore, Create & Grow",
    description: "Workshops & summer camps packed with creativity, adventure, and fun.",
    images: [
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1200&q=80",
    ],
  },
};

export default function HomePage() {
  return <HomePageClient />;
}
