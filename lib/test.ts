import type { Dificultate, Item } from "./types";
import { NUMAR_INTREBARI_TEST } from "./taxonomie";

// Asamblează un test din banca de itemi — fără AI, totul deterministic.

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

// Itemii unui nivel de dificultate.
export function itemiPeNivel(toti: Item[], nivel: Dificultate): Item[] {
  return toti.filter((it) => (it.dificultate ?? "mediu") === nivel);
}

export interface SelectieTest {
  test: Item[];
  // Lista actualizată de id-uri „văzute”, de salvat (localStorage).
  vazute: string[];
}

// Selectează `n` întrebări dintr-un pool, preferând cele NEvăzute la retest.
// Când toate au fost văzute, ciclul se resetează (pool-ul se reia de la capăt).
export function selecteazaTest(
  pool: Item[],
  vazute: string[],
  seed = Date.now() % 233280,
  n = NUMAR_INTREBARI_TEST
): SelectieTest {
  if (pool.length === 0) return { test: [], vazute };

  const setVazute = new Set(vazute);
  const nevazute = pool.filter((it) => !setVazute.has(it.id));

  if (nevazute.length >= n) {
    // Avem destule întrebări noi — le folosim și le marcăm ca văzute.
    const test = amesteca(nevazute, seed).slice(0, n);
    return { test, vazute: [...vazute, ...test.map((t) => t.id)] };
  }

  // Nu mai sunt destule noi: resetăm ciclul. Folosim întâi ce a rămas nevăzut,
  // apoi completăm din restul; noul „vazute” pornește doar cu testul curent.
  const completare = amesteca(
    pool.filter((it) => !nevazute.some((x) => x.id === it.id)),
    seed
  ).slice(0, n - nevazute.length);
  const test = amesteca([...nevazute, ...completare], seed + 1).slice(0, n);
  return { test, vazute: test.map((t) => t.id) };
}
