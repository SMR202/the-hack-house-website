import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sanityFetch } from "@/sanity/lib/client";
import {
  PROGRAM_BY_SLUG_QUERY,
  RELATED_PROGRAMS_QUERY,
  ALL_PROGRAM_SLUGS_QUERY,
} from "@/sanity/lib/queries";
import type { Program } from "@/types/sanity";
import ProgramDetailClient from "./program-detail-client";

interface Props {
  params: Promise<{ programId: string }>;
}

export async function generateStaticParams() {
  const slugs = await sanityFetch<{ programId: string }[]>({
    query: ALL_PROGRAM_SLUGS_QUERY,
    revalidate: 3600,
  });
  return slugs ?? [];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { programId } = await params;
  const program = await sanityFetch<Program | null>({
    query: PROGRAM_BY_SLUG_QUERY,
    params: { slug: programId },
  });
  if (!program) {
    return { title: "Program not found · The Hack House" };
  }
  return {
    title: `${program.title} · The Hack House`,
    description: program.shortDescription,
    openGraph: {
      title: `${program.title} · The Hack House`,
      description: program.shortDescription,
      images: [program.image],
      type: "article",
    },
  };
}

export default async function ProgramDetailPage({ params }: Props) {
  const { programId } = await params;
  const program = await sanityFetch<Program | null>({
    query: PROGRAM_BY_SLUG_QUERY,
    params: { slug: programId },
  });

  if (!program) {
    notFound();
  }

  const related = await sanityFetch<Program[]>({
    query: RELATED_PROGRAMS_QUERY,
    params: { slug: programId, category: program.category, ageGroup: program.ageGroup },
  });

  return <ProgramDetailClient program={program} related={related} />;
}
