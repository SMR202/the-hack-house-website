import type { Metadata } from "next";
import SummerCampClient from "./summer-camp-client";

export const metadata: Metadata = {
  title: "Summer Camp — The Hack House",
  description:
    "The best summer your child has ever had. Day camps and residential adventures for kids aged 5–14, all summer long.",
  openGraph: {
    title: "Summer Camp — The Hack House",
    description: "The best summer your child has ever had ☀️",
    images: [
      "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=1200&q=80",
    ],
  },
};

export default function SummerCampPage() {
  return <SummerCampClient />;
}
