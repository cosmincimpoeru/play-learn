"use client";

import { useEffect, useState } from "react";

// Mesaj de încurajare pentru copii, care se schimbă la fiecare vizită.
// Pornim cu primul mesaj (la fel pe server și client, fără erori de hidratare),
// apoi alegem unul aleatoriu după ce pagina s-a încărcat.
const MESAJE = [
  "Ești curajos că înveți! 🌟",
  "Fiecare greșeală te face mai isteț! 💪",
  "Curiozitatea e superputerea ta! 🚀",
  "Azi ai învățat ceva nou — bravo! 🎉",
  "Pas cu pas, devii tot mai bun! 🐾",
  "Mintea ta crește când te joci și înveți! 🌱",
];

export function Incurajare() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    setIdx(Math.floor(Math.random() * MESAJE.length));
  }, []);

  return <p className="text-lg font-bold text-brand-rosu">{MESAJE[idx]}</p>;
}
