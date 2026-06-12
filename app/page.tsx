import { Card } from "@/components/Card";
import { CONTEXTE } from "@/lib/taxonomie";

// Acasă: alegi contextul — Teste sau Practică (Context → Clasă → Materie).
export default function Acasa() {
  return (
    <main>
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-black text-brand-albastru">📘 EduApp</h1>
        <p className="mt-2 text-lg font-bold text-brand-inchis/70">Învățăm jucându-ne!</p>
      </header>

      <p className="mb-4 text-center text-lg font-bold">Ce vrei să faci azi?</p>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {CONTEXTE.map((c) => (
          <Card key={c.id} href={`/${c.id}`} emoji={c.emoji} titlu={c.titlu} subtitlu={c.descriere} />
        ))}
      </div>
    </main>
  );
}
