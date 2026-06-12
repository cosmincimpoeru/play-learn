# 📘 EduApp — Platformă educațională (ciclul primar)

Aplicație web educațională pentru Clasa Pregătitoare – Clasa a IV-a.
**100% gratuită**: conținutul este generat o singură dată cu AI și salvat ca JSON;
aplicația **nu apelează niciun serviciu AI la rulare** și se găzduiește gratuit pe Vercel.

## 🏗️ Arhitectură

```
PDF-uri programă/teste ──(o dată, cu Claude/Claude Code)──► content/*.json (revizuit)
                                                                  │
                                          Next.js (static) ───────┘
                                                  │
                                     Vercel (gratuit) → copii
```

- Fără bază de date, fără API la rulare, fără cont — totul static.
- Navigare: **Context → Clasă → Materie** (`/teste/pregatitoare/limba-romana`).

## 📂 Structură

| Cale | Ce conține |
|---|---|
| `app/` | Paginile (Home, Context, Clasă, Materie) |
| `components/` | UI: carduri, runnere Test/Practică, lecții |
| `lib/` | Tipuri, încărcare conținut, asamblare test, feedback pe șabloane |
| `content/curriculum/{clasa}/{materie}.json` | Programa parsată (competențe) |
| `content/lessons/{clasa}/{materie}.json` | Lecții (Învățare) |
| `content/items/{clasa}/{materie}.json` | Banca de itemi (Practică + Teste) |

## 🔁 Cum adaugi conținut nou (pasul „generezi o dată”)

Conținutul se generează **offline** (în Claude Code, acoperit de abonamentul Pro) și se
salvează în `content/`. Aplicația îl preia automat — o materie fără fișiere apare „În curând”.

1. Dă-i lui Claude PDF-ul programei + un test EN ca model.
2. Cere JSON conform `lib/types.ts` (`Programa`, `Lectie[]`, `Item[]`).
3. Revizuiește și pune fișierele în `content/...`.
4. `git commit` → Vercel redeployează automat. Gata.

## 🚀 Rulare locală

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # verifică generarea statică
```

## ☁️ Deploy gratuit pe Vercel

1. `git push` într-un repo GitHub.
2. Importă repo-ul pe vercel.com (preset „Next.js”, fără variabile de mediu).
3. Deploy. Costuri recurente: **0 €**.

## ✅ Cerințe acoperite

Context→Clasă→Materie · Teste cu 9 întrebări · feedback (șabloane) · export PDF
(tipărire) · regula MAJUSCULE pentru Clasa Pregătitoare · diacritice corecte ·
fără DB / fără login · scalabil (DB + conturi se adaugă ulterior fără rescriere).
