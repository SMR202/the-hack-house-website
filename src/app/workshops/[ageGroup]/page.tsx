import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ageGroups, type AgeGroupId } from "@/data/programs";
import AgeGroupPageClient from "./age-group-client";

interface Props {
  params: Promise<{ ageGroup: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { ageGroup } = await params;
  const ag = ageGroups[ageGroup as AgeGroupId];
  if (!ag) return { title: "Workshops · The Hack House" };
  const title = `${ag.name} (${ag.range}) — Workshops`;
  return {
    title: `${title} · The Hack House`,
    description: `${ag.name} workshops for ${ag.range}. ${ag.tagline}. Browse arts, cooking, science, sports, drama, and music programs at The Hack House.`,
    openGraph: {
      title: `${title} · The Hack House`,
      description: `${ag.tagline} — workshops designed for ${ag.range}.`,
    },
  };
}

export default async function AgeGroupPage({ params }: Props) {
  const { ageGroup } = await params;
  if (!ageGroups[ageGroup as AgeGroupId]) {
    notFound();
  }
  return <AgeGroupPageClient ageGroup={ageGroup} />;
}
