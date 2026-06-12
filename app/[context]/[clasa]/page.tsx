import { notFound } from "next/navigation";
import { Bara } from "@/components/Bara";
import { Card } from "@/components/Card";
import { areContinut } from "@/lib/content";
import {
  CLASE,
  CONTEXTE,
  MATERII,
  doarMajuscule,
  etichetaClasa,
} from "@/lib/taxonomie";
import type { ClasaId } from "@/lib/types";

export function generateStaticParams() {
  const out: { context: string; clasa: string }[] = [];
  for (const ctx of CONTEXTE) for (const cl of CLASE) out.push({ context: ctx.id, clasa: cl.id });
  return out;
}

// Pasul 3: alegi materia. Materiile fără conținut publicat apar „În curând”.
export default async function PaginaMaterii({
  params,
}: {
  params: Promise<{ context: string; clasa: string }>;
}) {
  const { context, clasa } = await params;
  if (!CONTEXTE.some((c) => c.id === context)) notFound();
  if (!CLASE.some((c) => c.id === clasa)) notFound();

  const maj = doarMajuscule(clasa);

  return (
    <main>
      <Bara caleInapoi={`/${context}`} titlu={etichetaClasa(clasa)} />
      <p className="mb-4 text-center text-lg font-bold">Alege materia:</p>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {MATERII.map((m) => {
          const disponibil = areContinut(clasa as ClasaId, m.id);
          return (
            <Card
              key={m.id}
              href={`/${context}/${clasa}/${m.id}`}
              emoji={m.emoji}
              titlu={m.titlu}
              culoare={`${m.culoare} text-white`}
              dezactivat={!disponibil}
              majuscule={maj}
            />
          );
        })}
      </div>
    </main>
  );
}
