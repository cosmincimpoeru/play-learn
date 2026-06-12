import Link from "next/link";

// Card mare, prietenos pentru copii — țintă mare de atins cu degetul.
export function Card({
  href,
  emoji,
  titlu,
  subtitlu,
  culoare = "bg-white",
  dezactivat = false,
  majuscule = false,
}: {
  href: string;
  emoji: string;
  titlu: string;
  subtitlu?: string;
  culoare?: string;
  dezactivat?: boolean;
  majuscule?: boolean;
}) {
  const continut = (
    <div
      className={`flex min-h-[140px] flex-col items-center justify-center gap-2 rounded-xl2 p-6 text-center shadow-lg transition ${culoare} ${
        dezactivat ? "opacity-50" : "hover:scale-[1.03] hover:shadow-xl"
      }`}
    >
      <span className="text-5xl">{emoji}</span>
      <span className={`text-xl font-extrabold text-brand-inchis ${majuscule ? "majuscule" : ""}`}>
        {titlu}
      </span>
      {subtitlu && <span className="text-sm font-semibold text-brand-inchis/70">{subtitlu}</span>}
      {dezactivat && <span className="text-xs font-bold text-brand-rosu">În curând</span>}
    </div>
  );

  if (dezactivat) return <div className="cursor-not-allowed">{continut}</div>;
  return <Link href={href}>{continut}</Link>;
}
