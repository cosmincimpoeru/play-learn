import { notFound } from "next/navigation";
import { Bara } from "@/components/Bara";
import { Lectii } from "@/components/Lectii";
import { PracticeRunner } from "@/components/PracticeRunner";
import { TestRunner } from "@/components/TestRunner";
import { getItemi, getLectii } from "@/lib/content";
import {
  CLASE,
  CONTEXTE,
  doarMajuscule,
  etichetaClasa,
  etichetaMaterie,
  materieValida,
  materiiPentruClasa,
} from "@/lib/taxonomie";
import type { ClasaId, MaterieId } from "@/lib/types";

export function generateStaticParams() {
  const out: { context: string; clasa: string; materie: string }[] = [];
  for (const ctx of CONTEXTE)
    for (const cl of CLASE)
      for (const m of materiiPentruClasa(cl.id))
        out.push({ context: ctx.id, clasa: cl.id, materie: m.id });
  return out;
}

export default async function PaginaMaterie({
  params,
}: {
  params: Promise<{ context: string; clasa: string; materie: string }>;
}) {
  const { context, clasa, materie } = await params;
  if (!CONTEXTE.some((c) => c.id === context)) notFound();
  if (!CLASE.some((c) => c.id === clasa)) notFound();

  const cl = clasa as ClasaId;
  const mat = materie as MaterieId;
  if (!materieValida(cl, mat)) notFound();
  const maj = doarMajuscule(clasa);

  const itemi = getItemi(cl, mat);
  const lectii = getLectii(cl, mat);

  const titlu = `${etichetaMaterie(materie)} · ${etichetaClasa(clasa)}`;

  return (
    <main>
      <Bara caleInapoi={`/${context}/${clasa}`} />
      <h1 className={`mb-6 text-center text-2xl font-black text-brand-albastru ${maj ? "majuscule" : ""}`}>
        {titlu}
      </h1>

      {context === "teste" ? (
        <TestRunner itemi={itemi} majuscule={maj} />
      ) : (
        <>
          <Lectii lectii={lectii} majuscule={maj} />
          <PracticeRunner itemi={itemi} majuscule={maj} />
        </>
      )}
    </main>
  );
}
