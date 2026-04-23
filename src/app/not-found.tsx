import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <div className="mx-auto mb-4 text-6xl">🧭</div>
        <h1 className="font-display text-7xl font-extrabold text-brand-teal">404</h1>
        <h2 className="mt-4 font-display text-xl font-bold text-brand-teal">
          We can&apos;t find that page
        </h2>
        <p className="mt-2 text-sm text-text-soft">
          The page you&apos;re looking for has wandered off. Let&apos;s get you back home.
        </p>
        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-brand-orange px-6 py-3 font-display text-sm font-extrabold text-white shadow-glow-orange transition-transform hover:scale-105"
          >
            Take me home
          </Link>
        </div>
      </div>
    </div>
  );
}
