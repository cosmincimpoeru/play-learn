"use client";

import { useMemo, useState } from "react";
import { genereazaFeedback } from "@/lib/feedback";
import { construiesteTest } from "@/lib/test";
import type { Item, RezultatTest } from "@/lib/types";

// Test: exact 9 întrebări (sau câte există), corectare în browser,
// feedback pe șabloane (fără AI) și export PDF prin tipărire.
export function TestRunner({ itemi, majuscule }: { itemi: Item[]; majuscule: boolean }) {
  const [seed, setSeed] = useState(() => Date.now() % 233280);
  const test = useMemo(() => construiesteTest(itemi, seed), [itemi, seed]);
  const [raspunsuri, setRaspunsuri] = useState<Record<string, number>>({});
  const [trimis, setTrimis] = useState(false);
  const m = majuscule ? "majuscule" : "";

  if (itemi.length === 0) {
    return <p className="text-center font-bold">Momentan nu sunt teste aici. Revino curând!</p>;
  }

  const corecte = test.filter((it) => raspunsuri[it.id] === it.raspunsCorect).length;
  const rezultat: RezultatTest = {
    totalIntrebari: test.length,
    corecte,
    scor: Math.round((corecte / test.length) * 100),
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
      <div className="no-print mb-4 flex items-center justify-between">
        <h2 className={`text-xl font-extrabold text-brand-albastru ${m}`}>📝 Test ({test.length} întrebări)</h2>
        {trimis && (
          <button onClick={() => window.print()} className="rounded-full bg-brand-verde px-4 py-2 font-bold text-white shadow">
            🖨️ Exportă PDF
          </button>
        )}
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
