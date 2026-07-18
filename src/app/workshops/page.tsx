import { permanentRedirect } from "next/navigation";

export default function WorkshopsRedirectPage() {
  permanentRedirect("/programs");
}
