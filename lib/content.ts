import "server-only";
import fs from "node:fs";
import path from "node:path";
import type { ClasaId, Item, Lectie, MaterieId, Programa } from "./types";

// Încarcă conținutul static din /content. Rulează doar pe server (la build /
// la cererea paginii). Fără apeluri AI — totul e citit din fișiere JSON.

const ROOT = path.join(process.cwd(), "content");

function citesteJson<T>(relPath: string): T | null {
  const full = path.join(ROOT, relPath);
  if (!fs.existsSync(full)) return null;
  return JSON.parse(fs.readFileSync(full, "utf-8")) as T;
}

export function getPrograma(clasa: ClasaId, materie: MaterieId): Programa | null {
  return citesteJson<Programa>(`curriculum/${clasa}/${materie}.json`);
}

export function getLectii(clasa: ClasaId, materie: MaterieId): Lectie[] {
  return citesteJson<Lectie[]>(`lessons/${clasa}/${materie}.json`) ?? [];
}

export function getItemi(clasa: ClasaId, materie: MaterieId): Item[] {
  return citesteJson<Item[]>(`items/${clasa}/${materie}.json`) ?? [];
}

// Există conținut publicat pentru această clasă+materie?
export function areContinut(clasa: ClasaId, materie: MaterieId): boolean {
  return getItemi(clasa, materie).length > 0 || getLectii(clasa, materie).length > 0;
}
