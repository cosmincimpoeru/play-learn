import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EduApp – Învățăm jucându-ne",
  description: "Platformă educațională pentru ciclul primar (Clasa Pregătitoare – Clasa a IV-a).",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro">
      <body className="min-h-screen font-sans antialiased">
        <div className="mx-auto max-w-4xl px-4 py-6">{children}</div>
      </body>
    </html>
  );
}
