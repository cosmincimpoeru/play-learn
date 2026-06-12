import Link from "next/link";

// Bară de navigare cu „firimituri” (breadcrumbs) și buton înapoi acasă.
export function Bara({ caleInapoi, titlu }: { caleInapoi?: string; titlu?: string }) {
  return (
    <div className="no-print mb-6 flex items-center justify-between">
      <Link
        href={caleInapoi ?? "/"}
        className="rounded-full bg-white px-4 py-2 text-lg font-bold shadow hover:bg-amber-100"
      >
        ← Înapoi
      </Link>
      {titlu && <h2 className="text-xl font-extrabold text-brand-albastru">{titlu}</h2>}
      <Link href="/" className="text-2xl" aria-label="Acasă">
        🏠
      </Link>
    </div>
  );
}
