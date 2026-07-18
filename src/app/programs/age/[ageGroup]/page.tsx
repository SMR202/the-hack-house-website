import { permanentRedirect } from "next/navigation";

export default function LegacyAgeGroupPage() {
  permanentRedirect("/programs");
}
