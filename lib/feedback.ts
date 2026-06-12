import type { RezultatTest } from "./types";

// Feedback pe șabloane — calculat în browser, FĂRĂ AI, deci 100% gratuit.
// Adaptat copiilor: cald, încurajator, niciodată critic.

export interface Feedback {
  titlu: string;
  mesaj: string;
  recomandare: string;
  emoji: string;
}

export function genereazaFeedback(r: RezultatTest, majuscule: boolean): Feedback {
  const p = r.scor;
  let fb: Feedback;

  if (p >= 89) {
    fb = {
      emoji: "🏆",
      titlu: "Felicitări, campion!",
      mesaj: `Ai răspuns corect la ${r.corecte} din ${r.totalIntrebari} întrebări. Ești foarte bun!`,
      recomandare: "Încearcă o materie nouă sau un test mai greu.",
    };
  } else if (p >= 67) {
    fb = {
      emoji: "🌟",
      titlu: "Foarte bine!",
      mesaj: `Ai ${r.corecte} răspunsuri corecte din ${r.totalIntrebari}. Ești pe drumul cel bun!`,
      recomandare: "Mai exersează puțin la Practică și vei fi campion.",
    };
  } else if (p >= 34) {
    fb = {
      emoji: "💪",
      titlu: "Bravo că ai încercat!",
      mesaj: `Ai ${r.corecte} răspunsuri corecte din ${r.totalIntrebari}. Mai ai puțin!`,
      recomandare: "Mergi la Învățare, citește lecția, apoi încearcă din nou.",
    };
  } else {
    fb = {
      emoji: "🌈",
      titlu: "Hai să mai exersăm!",
      mesaj: `Ai ${r.corecte} răspunsuri corecte. Important e că ai încercat — așa învățăm!`,
      recomandare: "Începe cu Învățare și Practică, apoi revino la test.",
    };
  }

  if (majuscule) {
    fb = {
      ...fb,
      titlu: fb.titlu.toUpperCase(),
      mesaj: fb.mesaj.toUpperCase(),
      recomandare: fb.recomandare.toUpperCase(),
    };
  }
  return fb;
}
