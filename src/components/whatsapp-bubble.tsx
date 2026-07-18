"use client";

import { MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";

export function WhatsAppBubble({ number }: { number?: string }) {
  const pathname = usePathname();
  if (!number) return null;

  const href = `https://wa.me/${number.replace(/\D/g, "")}`;
  const aboveMobileBar = /^\/programs\/[^/]+$/.test(pathname);

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with The Hack House on WhatsApp"
      title="Chat on WhatsApp"
      className={`whatsapp-bubble fixed right-4 z-[45] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lift transition-transform hover:scale-105 md:bottom-6 md:right-6 ${aboveMobileBar ? "bottom-24" : "bottom-5"}`}
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
