import Link from "next/link";

export default function ProgramNotFound() {
  return (
    <div className="mx-auto max-w-xl px-6 py-24 text-center">
      <div className="text-5xl">🔍</div>
      <h1 className="mt-3 font-display text-3xl font-extrabold text-brand-teal">Program not found</h1>
      <Link href="/programs" className="mt-5 inline-block font-display font-bold text-primary">
        ← Browse programs
      </Link>
    </div>
  );
}
