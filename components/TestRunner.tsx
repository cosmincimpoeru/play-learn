"use client";

import { useMemo, useState } from "react";
import { genereazaFeedback } from "@/lib/feedback";
import { itemiPeNivel, selecteazaTest } from "@/lib/test";
import { NIVELURI, etichetaNivel } from "@/lib/taxonomie";
import type { Dificultate, Item, RezultatTest } from "@/lib/types";

// Test: alegi nivelul (Ușor/Mediu/Greu), apoi rezolvi exact 9 întrebări.
// La retest, întrebările nu se repetă până se epuizează pool-ul nivelului
// (memorăm întrebările văzute în localStorage).
export function TestRunner({
  itemi,
  majuscule,
  clasa,
  materie,
}: {
  itemi: Item[];
  majuscule: boolean;
  clasa: string;
  materie: string;
}) {
  const [nivel, setNivel] = useState<Dificultate | null>(null);
  const m = majuscule ? "majuscule" : "";

  if (itemi.length === 0) {
    return <p className="text-center font-bold">Momentan nu sunt teste aici. Revino curând!</p>;
  }

  // Pasul 1: alegerea nivelului.
  if (!nivel) {
    return (
      <section>
        <h2 className={`mb-4 text-center text-xl font-extrabold text-brand-albastru ${m}`}>
          Alege nivelul testului
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {NIVELURI.map((n) => {
            const cate = itemiPeNivel(itemi, n.id).length;
            return (
              <button
                key={n.id}
                onClick={() => setNivel(n.id)}
                className={`flex min-h-[120px] flex-col items-center justify-center gap-2 rounded-xl2 p-6 text-white shadow-lg transition hover:scale-[1.03] ${n.culoare}`}
              >
                <span className="text-4xl">{n.emoji}</span>
                <span className={`text-xl font-extrabold ${m}`}>{n.titlu}</span>
              </button>
            );
          })}
        </div>
      </section>
    );
  }

  return (
    <TestNivel
      itemi={itemi}
      nivel={nivel}
      majuscule={majuscule}
      clasa={clasa}
      materie={materie}
      onSchimbaNivel={() => setNivel(null)}
    />
  );
}

function cheieVazute(clasa: string, materie: string, nivel: Dificultate) {
  return `eduapp:vazute:${clasa}:${materie}:${nivel}`;
}

function TestNivel({
  itemi,
  nivel,
  majuscule,
  clasa,
  materie,
  onSchimbaNivel,
}: {
  itemi: Item[];
  nivel: Dificultate;
  majuscule: boolean;
  clasa: string;
  materie: string;
  onSchimbaNivel: () => void;
}) {
  const m = majuscule ? "majuscule" : "";

  // Pool-ul nivelului ales; dacă are sub 9 întrebări, completăm din toate.
  const pool = useMemo(() => {
    const peNivel = itemiPeNivel(itemi, nivel);
    return peNivel.length >= 9 ? peNivel : itemi;
  }, [itemi, nivel]);

  const [seed, setSeed] = useState(() => Date.now() % 233280);

  const test = useMemo(() => {
    let vazute: string[] = [];
    if (typeof window !== "undefined") {
      try {
        vazute = JSON.parse(localStorage.getItem(cheieVazute(clasa, materie, nivel)) || "[]");
      } catch {
        vazute = [];
      }
    }
    const sel = selecteazaTest(pool, vazute, seed);
    if (typeof window !== "undefined") {
      localStorage.setItem(cheieVazute(clasa, materie, nivel), JSON.stringify(sel.vazute));
    }
    return sel.test;
    // seed se schimbă la „Test nou”, declanșând o selecție nouă.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pool, seed, clasa, materie, nivel]);

  const [raspunsuri, setRaspunsuri] = useState<Record<string, number>>({});
  const [trimis, setTrimis] = useState(false);

  const corecte = test.filter((it) => raspunsuri[it.id] === it.raspunsCorect).length;
  const rezultat: RezultatTest = {
    totalIntrebari: test.length,
    corecte,
    scor: test.length ? Math.round((corecte / test.length) * 100) : 0,
  };
  const feedback = genereazaFeedback(rezultat, majuscule);
  const toateRaspunse = test.every((it) => raspunsuri[it.id] !== undefined);

  function reia() {
    setRaspunsuri({});
    setTrimis(false);
    setSeed(Date.now() % 233280);
  }

  return (
    <section>
      <div className="no-print mb-4 flex flex-wrap items-center justify-between gap-2">
        <h2 className={`text-xl font-extrabold text-brand-albastru ${m}`}>
          📝 Test · Nivel {etichetaNivel(nivel)} ({test.length} întrebări)
        </h2>
        <div className="flex gap-2">
          <button onClick={onSchimbaNivel} className="rounded-full bg-white px-4 py-2 font-bold shadow hover:bg-amber-100">
            ↔ Schimbă nivelul
          </button>
          {trimis && (
            <button onClick={() => window.print()} className="rounded-full bg-brand-verde px-4 py-2 font-bold text-white shadow">
              🖨️ Exportă PDF
            </button>
          )}
        </div>
      </div>

      {trimis && (
        <div className="mb-6 rounded-xl2 bg-white p-6 text-center shadow-lg">
          <div className="text-6xl">{feedback.emoji}</div>
          <h3 className={`mt-2 text-2xl font-black text-brand-albastru ${m}`}>{feedback.titlu}</h3>
          <p className={`mt-2 text-lg font-bold ${m}`}>{feedback.mesaj}</p>
          <p className={`mt-2 font-semibold text-brand-rosu ${m}`}>👉 {feedback.recomandare}</p>
          <div className="mt-4 text-3xl font-black text-brand-verde">{rezultat.scor}%</div>
        </div>
      )}

      <ol className="space-y-4">
        {test.map((it, n) => {
          const ales = raspunsuri[it.id];
          return (
            <li key={it.id} className="rounded-xl2 bg-white p-5 shadow">
              <p className={`font-extrabold ${m}`}>
                {n + 1}. {it.enunt} <span className="text-sm font-bold text-brand-inchis/50">({it.punctaj} p.)</span>
              </p>
              <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {it.variante.map((v, i) => {
                  let stil = "bg-amber-100 hover:bg-amber-200";
                  if (trimis && i === it.raspunsCorect) stil = "bg-brand-verde text-white";
                  else if (trimis && i === ales) stil = "bg-brand-rosu text-white";
                  else if (!trimis && i === ales) stil = "bg-brand-albastru text-white";
                  return (
                    <button
                      key={i}
                      disabled={trimis}
                      onClick={() => setRaspunsuri((r) => ({ ...r, [it.id]: i }))}
                      className={`rounded-xl p-3 text-left font-bold shadow transition ${stil} ${m}`}
                    >
                      {String.fromCharCode(65 + i)}. {v}
                    </button>
                  );
                })}
              </div>
              {trimis && (
                <p className={`mt-3 rounded-lg bg-amber-50 p-3 text-sm font-semibold ${m}`}>💡 {it.explicatie}</p>
              )}
            </li>
          );
        })}
      </ol>

      <div className="no-print mt-6 flex justify-center gap-3">
        {!trimis ? (
          <button
            onClick={() => setTrimis(true)}
            disabled={!toateRaspunse}
            className={`rounded-full px-8 py-3 text-lg font-black text-white shadow-lg ${
              toateRaspunse ? "bg-brand-rosu hover:scale-105" : "bg-gray-300"
            } ${m}`}
          >
            {toateRaspunse ? "Vezi rezultatul!" : "Răspunde la toate întrebările"}
          </button>
        ) : (
          <button onClick={reia} className={`rounded-full bg-brand-albastru px-8 py-3 text-lg font-black text-white shadow-lg ${m}`}>
            🔄 Test nou
          </button>
        )}
      </div>
    </section>
  );
}
