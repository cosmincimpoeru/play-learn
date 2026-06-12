import type { ClasaId, ContextId, MaterieId } from "./types";

// Etichete și ordine pentru navigare. Sursa unică de adevăr pentru UI.

export const CONTEXTE: { id: ContextId; titlu: string; emoji: string; descriere: string }[] = [
  { id: "teste", titlu: "Teste", emoji: "📝", descriere: "Rezolvă un test cu 9 întrebări" },
  { id: "practica", titlu: "Practică", emoji: "🎯", descriere: "Exersează cu ajutor pas cu pas" },
];

export const CLASE: { id: ClasaId; titlu: string; emoji: string }[] = [
  { id: "pregatitoare", titlu: "Clasa Pregătitoare", emoji: "🌱" },
  { id: "clasa-1", titlu: "Clasa I", emoji: "1️⃣" },
  { id: "clasa-2", titlu: "Clasa a II-a", emoji: "2️⃣" },
  { id: "clasa-3", titlu: "Clasa a III-a", emoji: "3️⃣" },
  { id: "clasa-4", titlu: "Clasa a IV-a", emoji: "4️⃣" },
];

export const MATERII: { id: MaterieId; titlu: string; emoji: string; culoare: string }[] = [
  { id: "limba-romana", titlu: "Comunicare în Limba Română", emoji: "📖", culoare: "bg-brand-rosu" },
  { id: "limba-engleza", titlu: "Comunicare în Limba Engleză", emoji: "🇬🇧", culoare: "bg-brand-albastru" },
  { id: "matematica-stiinte", titlu: "Matematică și Științe ale Naturii", emoji: "🔢", culoare: "bg-brand-verde" },
  { id: "religie-ortodoxa", titlu: "Religie Ortodoxă", emoji: "✝️", culoare: "bg-violet-500" },
  { id: "educatie-civica", titlu: "Educație Civică", emoji: "🤝", culoare: "bg-teal-500" },
  { id: "istorie", titlu: "Istorie", emoji: "🏛️", culoare: "bg-amber-700" },
  { id: "geografie", titlu: "Geografie", emoji: "🌍", culoare: "bg-sky-600" },
  { id: "ai-roboti", titlu: "AI și Roboți", emoji: "🤖", culoare: "bg-brand-galben" },
];

// Materiile diferă pe clase (conform planurilor-cadru oficiale):
// - Educație Civică: clasele a III-a și a IV-a
// - Istorie și Geografie: doar clasa a IV-a
const MATERII_DE_BAZA: MaterieId[] = [
  "limba-romana",
  "matematica-stiinte",
  "limba-engleza",
  "religie-ortodoxa",
  "ai-roboti",
];

const MATERII_PE_CLASA: Record<ClasaId, MaterieId[]> = {
  pregatitoare: MATERII_DE_BAZA,
  "clasa-1": MATERII_DE_BAZA,
  "clasa-2": MATERII_DE_BAZA,
  "clasa-3": [...MATERII_DE_BAZA, "educatie-civica"],
  "clasa-4": [...MATERII_DE_BAZA, "educatie-civica", "istorie", "geografie"],
};

// Materiile disponibile pentru o clasă, în ordinea de afișare.
export function materiiPentruClasa(clasa: ClasaId) {
  const ids = MATERII_PE_CLASA[clasa] ?? MATERII_DE_BAZA;
  return ids
    .map((id) => MATERII.find((m) => m.id === id))
    .filter((m): m is (typeof MATERII)[number] => Boolean(m));
}

// Verifică dacă o materie este prevăzută în programa clasei.
export function materieValida(clasa: ClasaId, materie: MaterieId): boolean {
  return (MATERII_PE_CLASA[clasa] ?? MATERII_DE_BAZA).includes(materie);
}

export const NUMAR_INTREBARI_TEST = 9;

export function etichetaContext(id: string) {
  return CONTEXTE.find((c) => c.id === id)?.titlu ?? id;
}
export function etichetaClasa(id: string) {
  return CLASE.find((c) => c.id === id)?.titlu ?? id;
}
export function etichetaMaterie(id: string) {
  return MATERII.find((m) => m.id === id)?.titlu ?? id;
}

// Clasa Pregătitoare începe cu MAJUSCULE (regulă din cerințe).
export function doarMajuscule(clasa: string): boolean {
  return clasa === "pregatitoare";
}
