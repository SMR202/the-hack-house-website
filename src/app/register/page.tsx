import type { Metadata } from "next";
import { Suspense } from "react";
import RegisterPageClient from "./register-client";

export const metadata: Metadata = {
  title: "Register Your Child · The Hack House",
  description: "Quick and easy registration for Hack House workshops and summer camps. Takes under 2 minutes.",
  openGraph: {
    title: "Register Your Child · The Hack House",
    description: "Grab your spot before it fills up!",
  },
};

export default function RegisterPage() {
  return (
    <Suspense>
      <RegisterPageClient />
    </Suspense>
  );
}
