"use client";

import { useState } from "react";
import type { Item } from "@/lib/types";

// Practică: un item pe rând, cu feedback imediat după fiecare răspuns.
export function PracticeRunner({ itemi, majuscule }: { itemi: Item[]; majuscule: boolean }) {
  const [idx, setIdx] = useState(0);
  const [ales, setAles] = useState<number | null>(null);
  const m = majuscule ? "majuscule" : "";

  if (itemi.length === 0) {
    return <p className="text-center font-bold">Momentan nu sunt exerciții aici. Revino curând!</p>;
  }

  const item = itemi[idx];
  const corect = ales === item.raspunsCorect;
  const aRaspuns = ales !== null;

  function urmatorul() {
    setAles(null);
    setIdx((i) => (i + 1) % itemi.length);
  }

  return (
    <section>
      <h2 className={`mb-4 text-xl font-extrabold text-brand-rosu ${m}`}>🎯 Practică</h2>
      <div className="rounded-xl2 bg-white p-6 shadow">
        <p className={`text-lg font-extrabold ${m}`}>{item.enunt}</p>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {item.variante.map((v, i) => {
            let stil = "bg-amber-100 hover:bg-amber-200";
            if (aRaspuns && i === item.raspunsCorect) stil = "bg-brand-verde text-white";
            else if (aRaspuns && i === ales) stil = "bg-brand-rosu text-white";
            return (
              <button
                key={i}
                disabled={aRaspuns}
                onClick={() => setAles(i)}
                className={`rounded-xl p-4 text-lg font-bold shadow transition ${stil} ${m}`}
              >
                {v}
              </button>
            );
          })}
        </div>

        {aRaspuns && (
          <div className={`mt-5 rounded-xl p-4 font-bold ${corect ? "bg-green-100" : "bg-amber-100"}`}>
            <p className={m}>
              {corect ? "✅ Bravo! Răspuns corect!" : "💡 Hai să vedem împreună:"}
            </p>
            <p className={`mt-1 font-semibold ${m}`}>{item.explicatie}</p>
            <button
              onClick={urmatorul}
              className={`mt-4 rounded-full bg-brand-albastru px-6 py-2 text-white shadow ${m}`}
            >
              Următorul →
            </button>
          </div>
        )}
      </div>
      <p className="mt-3 text-center text-sm font-bold text-brand-inchis/60">
        Exercițiul {idx + 1} din {itemi.length}
      </p>
    </section>
  );
}
