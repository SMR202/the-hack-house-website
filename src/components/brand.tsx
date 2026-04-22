import * as React from "react";

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
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path
        d="M8 22 L24 8 L40 22 L40 40 Q40 42 38 42 L10 42 Q8 42 8 40 Z"
        fill="var(--color-primary)"
      />
      <path
        d="M24 18 L26.2 23 L31.5 23.6 L27.5 27.2 L28.7 32.4 L24 29.8 L19.3 32.4 L20.5 27.2 L16.5 23.6 L21.8 23 Z"
        fill="white"
      />
    </svg>
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
