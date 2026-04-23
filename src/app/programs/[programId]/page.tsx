import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProgramById } from "@/data/programs";
import ProgramDetailClient from "./program-detail-client";

interface Props {
  params: Promise<{ programId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { programId } = await params;
  const program = getProgramById(programId);
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
  if (!getProgramById(programId)) {
    notFound();
  }
  return <ProgramDetailClient programId={programId} />;
}
