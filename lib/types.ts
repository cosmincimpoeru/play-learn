// Modelul de date al aplicației EduApp.
// Tot conținutul este generat o singură dată (offline, cu AI) și salvat ca JSON.
// Aplicația nu apelează niciodată un serviciu AI la rulare — totul e static.

export type ContextId = "teste" | "practica";

export type ClasaId =
  | "pregatitoare"
  | "clasa-1"
  | "clasa-2"
  | "clasa-3"
  | "clasa-4";

export type MaterieId =
  | "limba-romana"
  | "limba-engleza"
  | "matematica-stiinte"
  | "religie-ortodoxa"
  | "educatie-civica"
  | "istorie"
  | "geografie"
  | "ai-roboti";

// ─── Programă școlară (parsată din PDF, o singură dată) ───────────────────

export interface CompetentaSpecifica {
  cod: string; // ex. "1.1"
  descriere: string;
  obiective: string[];
  continuturi: string[];
}

export interface Programa {
  clasa: ClasaId;
  materie: MaterieId;
  sursa: string; // numele documentului oficial (OMEN ...)
  competenteGenerale: string[];
  competenteSpecifice: CompetentaSpecifica[];
}

// ─── Lecții (Learn) ───────────────────────────────────────────────────────

export interface Lectie {
  id: string;
  clasa: ClasaId;
  materie: MaterieId;
  competenta: string; // codul competenței vizate, ex. "1.1"
  titlu: string;
  explicatie: string; // text scurt, jucăuș
  exemplu: string;
  activitate: string; // "încearcă tu"
  jocuri: string[];
}

// ─── Itemi (folosiți și la Practică, și la Teste) ─────────────────────────

export type TipItem = "alegere" | "adevarat-fals";

// Nivelul de dificultate al unei întrebări.
export type Dificultate = "usor" | "mediu" | "greu";

export interface Item {
  id: string;
  clasa: ClasaId;
  materie: MaterieId;
  competenta: string;
  tip: TipItem;
  dificultate: Dificultate;
  enunt: string;
  variante: string[];
  raspunsCorect: number; // index în `variante`
  explicatie: string; // feedback afișat după răspuns
  punctaj: number;
}

// ─── Rezultate / feedback (calculate în browser, fără AI) ─────────────────

export interface RezultatTest {
  totalIntrebari: number;
  corecte: number;
  scor: number; // procent 0-100
}
