import Link from "next/link";
import { Incurajare } from "./Incurajare";

// Footer prietenos, afișat pe toate paginile. Ascuns la tipărire (export PDF).
export function Footer() {
  return (
    <footer className="no-print mt-12 border-t-2 border-amber-200 pt-8 text-center">
      <p className="text-2xl font-black text-brand-albastru">
        ✨ Școala te face să vezi
      </p>
      <p className="mt-1 font-bold text-brand-inchis/70">
        Învățăm jucându-ne în fiecare zi
      </p>

      <nav className="mt-5 flex flex-wrap items-center justify-center gap-3">
        <Link href="/" className="rounded-full bg-white px-4 py-2 font-bold shadow hover:bg-amber-100">
          🏠 Acasă
        </Link>
        <Link href="/teste" className="rounded-full bg-white px-4 py-2 font-bold shadow hover:bg-amber-100">
          📝 Teste
        </Link>
        <Link href="/practica" className="rounded-full bg-white px-4 py-2 font-bold shadow hover:bg-amber-100">
          🎯 Practică
        </Link>
      </nav>

      <div className="mt-5">
        <Incurajare />
      </div>

      <p className="mt-5 text-sm font-semibold text-brand-inchis/60">
        📚 Conținut aliniat programei școlare oficiale (clasele pregătitoare – a IV-a)
      </p>
      <p className="mt-2 text-sm font-bold text-brand-inchis/50">
        Făcut cu 💛 pentru copiii curioși
      </p>
    </footer>
  );
}
