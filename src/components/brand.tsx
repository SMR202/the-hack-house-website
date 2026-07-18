import * as React from "react";
import Image from "next/image";

export function WaveDivider({
  flip = false,
  fromColor = "transparent",
  toColor = "var(--color-background)",
  className = "",
}: {
  flip?: boolean;
  fromColor?: string;
  toColor?: string;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none w-full leading-[0] ${className}`}
      style={{ backgroundColor: fromColor, transform: flip ? "rotate(180deg)" : undefined }}
    >
      <svg
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        className="block h-[60px] w-full md:h-[90px]"
      >
        <path
          d="M0,40 C240,90 420,0 720,40 C1020,80 1200,10 1440,50 L1440,90 L0,90 Z"
          fill={toColor}
        />
      </svg>
    </div>
  );
}

export function Squiggle({ className = "", color = "var(--color-brand-orange)" }: { className?: string; color?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 220 14"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 8 Q 22 -2, 42 8 T 82 8 T 122 8 T 162 8 T 202 8 T 218 8"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Blob({
  className = "",
  color = "var(--color-primary)",
  opacity = 0.15,
}: {
  className?: string;
  color?: string;
  opacity?: number;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 600 600"
      className={`pointer-events-none absolute ${className}`}
      style={{ opacity }}
    >
      <path
        fill={color}
        d="M421,316Q406,382,346,418Q286,454,217,438Q148,422,116,360Q84,298,116,237Q148,176,213,140Q278,104,346,131Q414,158,432,229Q450,300,421,316Z"
      />
    </svg>
  );
}

export function HouseLogo({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <Image
      src="/images/hack-house-logo.png"
      alt="The Hack House"
      width={1024}
      height={1024}
      className={`object-contain ${className}`}
      priority
    />
  );
}

export function useCountUp(target: number, durationMs = 1400) {
  const [value, setValue] = React.useState(0);
  const ref = React.useRef<HTMLSpanElement | null>(null);
  const started = React.useRef(false);

  React.useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const tick = (now: number) => {
              const t = Math.min(1, (now - start) / durationMs);
              const eased = 1 - Math.pow(1 - t, 3);
              setValue(Math.round(target * eased));
              if (t < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 },
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, durationMs]);

  return { value, ref };
}
