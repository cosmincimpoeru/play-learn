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
  { id: "ai-roboti", titlu: "AI și Roboți", emoji: "🤖", culoare: "bg-brand-galben" },
];

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
