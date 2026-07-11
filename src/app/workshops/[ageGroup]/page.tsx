import { redirect } from "next/navigation";

interface Props {
  params: Promise<{ ageGroup: string }>;
}

export default async function WorkshopAgeGroupRedirectPage({ params }: Props) {
  const { ageGroup } = await params;
  redirect(`/programs/age/${ageGroup}`);
}
