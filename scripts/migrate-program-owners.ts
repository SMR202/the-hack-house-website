import { getCliClient } from "sanity/cli";
import { createClient } from "next-sanity";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const apiVersion = "2026-04-01";
const token = process.env.SANITY_EDITOR_TOKEN
  ?? process.env.SANITY_API_TOKEN
  ?? process.env.SANITIY_API_TOKEN;
const client = token
  ? createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
      apiVersion,
      token,
      useCdn: false,
    })
  : getCliClient({ apiVersion });

async function main() {
  const documents = await client.fetch<Array<{
    _id: string;
    slug?: { current?: string };
    type?: string;
    section?: string;
    highlights?: string[];
    whatKidsWillDo?: string[];
  }>>(`*[_type == "program"]{_id, slug, type, section, highlights, whatKidsWillDo}`);

  const transaction = client.transaction();
  for (const document of documents) {
    const slug = document.slug?.current;
    const retained = !document.section || document.section === "haven-montessori" ||
      (document.section === "crash-courses-children" && [
        "toddler-tot-program",
        "little-leaders-growth",
        "teen-led-program",
      ].includes(slug ?? ""));
    if (!retained) {
      transaction.delete(document._id);
      continue;
    }
    const owner = slug === "haven-therapy-services"
      ? "haven-autism"
      : document.type === "montessori" || document.type === "camp" || document.section === "haven-montessori"
        ? "haven-montessori"
        : "hack-house";

    transaction.patch(document._id, (patch) => patch
      .set({ owner, highlights: document.highlights?.length ? document.highlights : document.whatKidsWillDo ?? [] })
      .unset(["section", "subsectionLabel", "participantKind", "type", "campType", "category", "categoryLabel", "categoryEmoji", "ageGroup", "whatKidsWillDo"]));
  }

  await transaction.commit();
  console.log(`Migrated in-scope programs and removed obsolete program documents.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
