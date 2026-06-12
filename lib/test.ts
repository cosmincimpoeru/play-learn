import type { Item } from "./types";
import { NUMAR_INTREBARI_TEST } from "./taxonomie";

// Asamblează un test din banca de itemi — fără AI, totul deterministic.
// Amestecă itemii cu un seed, ca să poată fi reprodus la nevoie (export PDF).

function amesteca<T>(arr: T[], seed: number): T[] {
  const a = [...arr];
  let s = seed || 1;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function construiesteTest(toti: Item[], seed = Date.now() % 233280): Item[] {
  return amesteca(toti, seed).slice(0, NUMAR_INTREBARI_TEST);
}
