import type { Metadata } from "next";
import WorkshopsLandingClient from "./workshops-client";

export const metadata: Metadata = {
  title: "Workshops — The Hack House",
  description:
    "Hands-on weekend workshops for kids aged 5–14. Arts, cooking, science, sports, drama, music. Choose your age group and dive in.",
  openGraph: {
    title: "Workshops — The Hack House",
    description: "Hands-on sessions where kids learn by doing.",
  },
};

export default function WorkshopsPage() {
  return <WorkshopsLandingClient />;
}
