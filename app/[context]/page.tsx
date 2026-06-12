import { notFound } from "next/navigation";
import { Bara } from "@/components/Bara";
import { Card } from "@/components/Card";
import { CLASE, CONTEXTE, etichetaContext } from "@/lib/taxonomie";

export function generateStaticParams() {
  return CONTEXTE.map((c) => ({ context: c.id }));
}

// Pasul 2: alegi clasa.
export default async function PaginaClase({
  params,
}: {
  params: Promise<{ context: string }>;
}) {
  const { context } = await params;
  if (!CONTEXTE.some((c) => c.id === context)) notFound();

  return (
    <main>
      <Bara caleInapoi="/" titlu={etichetaContext(context)} />
      <p className="mb-4 text-center text-lg font-bold">Alege clasa:</p>
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3">
        {CLASE.map((c) => (
          <Card key={c.id} href={`/${context}/${c.id}`} emoji={c.emoji} titlu={c.titlu} />
        ))}
      </div>
    </main>
  );
}
