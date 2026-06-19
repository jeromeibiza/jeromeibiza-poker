import Link from "next/link";
import type { Metadata } from "next";
import { MODULES } from "@/lib/poker/academy";
import { Crumbs, Section, JsonLd } from "@/components/ui";

export const metadata: Metadata = {
  title: "Académie Croupier Poker, formation gratuite pour devenir dealer",
  description:
    "La seule formation gratuite francophone pour apprendre le métier de croupier poker : " +
    "10 modules (jetons, cartes, gestion du pot, rake, annonces, litiges) + examen final certifié. " +
    "Par Jérôme Ibiza, croupier professionnel.",
  alternates: { canonical: "/academie-croupier" },
};

export default function AcademiePage() {
  const courseLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Académie Croupier Poker Jérôme Ibiza",
    description:
      "Formation gratuite en 10 modules pour devenir croupier de poker : manipulation des jetons " +
      "et des cartes, gestion du pot et des side pots, prélèvement du rake, annonces, situations " +
      "cash game et tournoi, gestion des litiges, examen final certifié.",
    provider: { "@type": "Person", name: "Jérôme Ibiza" },
    inLanguage: "fr-FR",
    isAccessibleForFree: true,
  };

  return (
    <div className="wrap">
      <JsonLd data={courseLd} />
      <Crumbs items={[{ label: "Accueil", href: "/" }, { label: "Académie Croupier" }]} />

      <div className="felt" style={{ padding: "40px 28px", marginTop: 8 }}>
        <div className="label" style={{ color: "#fbe8c2", fontSize: 12, marginBottom: 12 }}>
          Formation 100% gratuite · 10 modules + examen
        </div>
        <h1 style={{ fontSize: "clamp(30px, 6vw, 54px)", color: "#fff", margin: 0, maxWidth: 760 }}>
          Académie Croupier Poker Jérôme Ibiza
        </h1>
        <p style={{ color: "rgba(255,255,255,0.88)", fontSize: 18, marginTop: 16, maxWidth: 640 }}>
          Apprends le métier de dealer poker comme on l&apos;apprend en casino, transmis par un
          croupier professionnel. De la manipulation des jetons à la gestion des litiges, jusqu&apos;à
          la certification finale. Gratuit, pour de vrai.
        </p>
        <Link href="/academie-croupier/introduction-au-metier" className="btn btn-gold" style={{ marginTop: 24 }}>
          Commencer le Module 1
        </Link>
      </div>

      <Section kicker="Le programme" title="Les 10 modules">
        <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 12 }}>
          {MODULES.map((m) => (
            <li key={m.slug}>
              <Link
                href={`/academie-croupier/${m.slug}`}
                className="card card-hover"
                style={{ display: "flex", gap: 16, alignItems: "center" }}
              >
                <span
                  className="display"
                  style={{ fontSize: 24, color: "var(--gold)", minWidth: 46, textAlign: "center" }}
                >
                  {String(m.n).padStart(2, "0")}
                </span>
                <span style={{ flex: 1 }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 18 }}>{m.emoji}</span>
                    <span className="display" style={{ fontSize: 17 }}>{m.title}</span>
                    <span className={`pill ${m.status === "complet" ? "pill-beginner" : ""}`}>
                      {m.status === "complet" ? "Disponible" : "Plan détaillé"}
                    </span>
                    <span className="pill">{m.minutes} min</span>
                  </span>
                  <span style={{ display: "block", color: "var(--muted)", fontSize: 14, marginTop: 6 }}>
                    {m.summary}
                  </span>
                </span>
                <span className="label" style={{ color: "var(--gold)", fontSize: 13 }}>→</span>
              </Link>
            </li>
          ))}
        </ol>
      </Section>

      <Section kicker="À qui s'adresse cette formation" title="Pour qui ?">
        <div className="grid-cards">
          {[
            ["Reconversion", "Tu cherches un métier vivant, sans diplôme préalable obligatoire, où la dextérité et le sérieux comptent plus que les années d'études."],
            ["Joueurs passionnés", "Tu joues déjà au poker et tu veux comprendre l'envers du décor, ou animer tes propres parties entre amis comme un pro."],
            ["Futurs dealers de festival", "Tu vises les grands circuits (WSOP, EPT, WPT) : on pose ici les bases du métier, annonces bilingues incluses."],
          ].map(([t, d]) => (
            <div key={t} className="card">
              <div className="display" style={{ fontSize: 17 }}>{t}</div>
              <p style={{ color: "var(--muted)", fontSize: 14, marginTop: 8 }}>{d}</p>
            </div>
          ))}
        </div>
      </Section>

      <div className="card" style={{ marginTop: 32, borderColor: "rgba(232,176,75,0.3)" }}>
        <p style={{ color: "var(--muted)" }}>
          Pas encore au point sur les règles ? Commence par{" "}
          <Link href="/apprendre" className="link">apprendre le poker</Link>{" "}avant de passer
          de l&apos;autre côté de la table.
        </p>
      </div>
    </div>
  );
}
