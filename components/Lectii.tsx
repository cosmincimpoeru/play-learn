import type { Lectie } from "@/lib/types";

// Secțiunea Învățare (Learn) — lecții jucăușe „play & learn”.
export function Lectii({ lectii, majuscule }: { lectii: Lectie[]; majuscule: boolean }) {
  if (lectii.length === 0) return null;
  const m = majuscule ? "majuscule" : "";

  return (
    <section className="mb-8">
      <h2 className={`mb-4 text-xl font-extrabold text-brand-verde ${m}`}>📚 Învățare</h2>
      <div className="space-y-4">
        {lectii.map((l) => (
          <article key={l.id} className="rounded-xl2 bg-white p-5 shadow">
            <h3 className={`text-lg font-extrabold text-brand-albastru ${m}`}>{l.titlu}</h3>
            <p className={`mt-2 font-semibold ${m}`}>{l.explicatie}</p>
            <p className={`mt-3 rounded-lg bg-amber-100 p-3 text-sm font-bold ${m}`}>
              💡 {l.exemplu}
            </p>
            <p className={`mt-3 font-bold text-brand-rosu ${m}`}>✏️ Încearcă tu: {l.activitate}</p>
            {l.jocuri.length > 0 && (
              <ul className={`mt-3 list-inside list-disc text-sm font-semibold ${m}`}>
                {l.jocuri.map((j, i) => (
                  <li key={i}>🎲 {j}</li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
