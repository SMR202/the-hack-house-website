import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sanityFetch } from "@/sanity/lib/client";
import {
  AGE_GROUP_BY_KEY_QUERY,
  PROGRAMS_BY_AGE_AND_TYPE_QUERY,
  ALL_AGE_GROUP_KEYS_QUERY,
  SITE_SETTINGS_QUERY,
} from "@/sanity/lib/queries";
import type { AgeGroup, Program, SiteSettings } from "@/types/sanity";
import AgeGroupPageClient from "../../../workshops/[ageGroup]/age-group-client";

interface Props {
  params: Promise<{ ageGroup: string }>;
}

export async function generateStaticParams() {
  const keys = await sanityFetch<{ ageGroup: string }[]>({
    query: ALL_AGE_GROUP_KEYS_QUERY,
    revalidate: 3600,
  });
  return keys ?? [];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { ageGroup } = await params;
  const ag = await sanityFetch<AgeGroup | null>({
    query: AGE_GROUP_BY_KEY_QUERY,
    params: { key: ageGroup },
  });
  if (!ag) return { title: "Programs · The Hack House" };
  const title = `${ag.name} (${ag.range}) — Programs`;
  return {
    title: `${title} · The Hack House`,
    description: `${ag.name} programs for ${ag.range}. ${ag.tagline}. Browse Haven Autism programs at The Hack House.`,
    openGraph: {
      title: `${title} · The Hack House`,
      description: `${ag.tagline} — Haven Autism programs designed for ${ag.range}.`,
    },
  };
}

export default async function ProgramAgeGroupPage({ params }: Props) {
  const { ageGroup } = await params;

  const [ag, programs, settings] = await Promise.all([
    sanityFetch<AgeGroup | null>({ query: AGE_GROUP_BY_KEY_QUERY, params: { key: ageGroup } }),
    sanityFetch<Program[]>({ query: PROGRAMS_BY_AGE_AND_TYPE_QUERY, params: { ageGroup, type: "program" } }),
    sanityFetch<SiteSettings | null>({ query: SITE_SETTINGS_QUERY }),
  ]);

  if (!ag) {
    notFound();
  }

  return (
    <AgeGroupPageClient
      ageGroup={ag}
      programs={programs}
      categories={settings?.categories ?? []}
      whatsapp={settings?.whatsappNumber}
    />
  );
}
