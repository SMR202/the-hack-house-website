import { permanentRedirect } from "next/navigation";

export default async function LegacySectionPage({ params }: { params: Promise<{ sectionSlug: string }> }) {
  const { sectionSlug } = await params;
  if (sectionSlug === "haven-autism") permanentRedirect("/haven-autism");
  if (sectionSlug === "haven-montessori") permanentRedirect("/haven-montessori");
  permanentRedirect("/programs");
}
