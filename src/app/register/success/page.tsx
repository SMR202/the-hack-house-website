import type { Metadata } from "next";
import { Suspense } from "react";
import SuccessPageClient from "./success-client";

export const metadata: Metadata = {
  title: "You're All Set! · The Hack House",
  description: "Registration received. Complete your payment to confirm your spot.",
  robots: { index: false },
};

export default function SuccessPage() {
  return (
    <Suspense>
      <SuccessPageClient />
    </Suspense>
  );
}
