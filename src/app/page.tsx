import Link from "next/link";
import type { Metadata } from "next";
import { NAV, SITE } from "@/lib/site";
import { JsonLd } from "@/components/ui";

export const metadata: Metadata = {
  title: "Poker Hub : apprendre le poker, jouer gratuitement et devenir croupier",
  description:
    "Le centre de ressources poker francophone : règles, classement des mains, " +
    "stratégie débutant à avancé, glossaire géant, calculateurs et la seule académie " +
    "gratuite pour devenir croupier poker. Par Jérôme Ibiza, croupier professionnel.",
  alternates: { canonical: "/" },
};

const HIGHLIGHTS = [
  {
    href: "/apprendre/parcours-debutant",
    emoji: "🎯",
    title: "Parcours débutant",
    desc: "Le tutoriel pas à pas avec quiz de validation et certificat à la clé.",
  },
  {
    href: "/apprendre/classement-des-mains",
    emoji: "🃏",
    title: "Classement des mains",
    desc: "Les 10 mains, leurs probabilités et des exemples visuels avec de vraies cartes.",
  },
  {
    href: "/academie-croupier",
    emoji: "🎓",
    title: "Devenir croupier, gratuit",
    desc: "10 modules pour apprendre le métier de dealer poker, par un croupier pro.",
  },
  {
    href: "/calculateurs/cotes",
    emoji: "🧮",
    title: "Calculateur de cotes",
    desc: "Pot odds, outs et cotes du tirage : sais-tu si tu dois suivre ce tapis ?",
  },
];

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    inLanguage: "fr-FR",
    author: { "@type": "Person", name: SITE.author },
  };

  return (
    <>
      <JsonLd data={jsonLd} />

      {/* HERO plein cadre (table Triton + marque sur le LED) */}
      <section
        aria-label="Poker Hub Jérôme Ibiza"
        style={{
          position: "relative",
          minHeight: "clamp(480px, 80vh, 780px)",
          display: "flex",
          overflow: "hidden",
          backgroundColor: "#05080a",
          backgroundImage: "url('/hero-table.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(5,8,10,0.6) 0%, rgba(5,8,10,0.12) 34%, rgba(5,8,10,0.28) 64%, rgba(5,8,10,0.95) 100%)",
          }}
        />
        <div
          className="wrap"
          style={{
            position: "relative",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            textAlign: "center",
            paddingBlock: "clamp(56px, 9vh, 88px) clamp(40px, 7vh, 64px)",
            gap: 24,
          }}
        >
          {/* Marque, sur le LED */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 22 }}>
            <div
              className="label"
              style={{
                color: "var(--gold-soft)",
                fontSize: 13,
                letterSpacing: 3.5,
                textShadow: "0 2px 18px rgba(0,0,0,0.85)",
              }}
            >
              Le centre de ressources poker francophone
            </div>
            <h1
              className="display"
              style={{
                fontSize: "clamp(40px, 8vw, 94px)",
                margin: 0,
                lineHeight: 1.06,
                letterSpacing: 3,
                color: "#f3cd86",
                textShadow: "0 2px 30px rgba(0,0,0,0.9), 0 0 70px rgba(232,176,75,0.28)",
              }}
            >
              JÉRÔME IBIZA
            </h1>
            <div
              className="label"
              style={{
                color: "rgba(255,255,255,0.85)",
                fontSize: 13,
                letterSpacing: 4,
                textShadow: "0 2px 14px rgba(0,0,0,0.95)",
              }}
            >
              Apprendre · Jouer · Devenir croupier
            </div>
          </div>

          {/* Accroche + CTA */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
            <p
              style={{
                color: "#fff",
                fontSize: "clamp(16px, 2.1vw, 20px)",
                maxWidth: 640,
                margin: "0 auto",
                lineHeight: 1.5,
                textShadow: "0 2px 16px rgba(0,0,0,0.95)",
              }}
            >
              Apprends le poker de zéro, entraîne-toi gratuitement et découvre le métier de
              croupier, par un croupier professionnel.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
              <Link href="/apprendre/parcours-debutant" className="btn btn-gold">Commencer le parcours</Link>
              <Link
                href="/academie-croupier"
                className="btn btn-ghost"
                style={{ color: "#fff", borderColor: "rgba(255,255,255,0.45)" }}
              >
                🎓 Formation croupier
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="wrap" style={{ marginTop: 24 }}>
        <div className="grid-cards">
          {HIGHLIGHTS.map((h) => (
            <Link key={h.href} href={h.href} className="card card-hover">
              <div style={{ fontSize: 26 }}>{h.emoji}</div>
              <h3 style={{ fontSize: 18, marginTop: 12 }}>{h.title}</h3>
              <p style={{ color: "var(--muted)", fontSize: 14, marginTop: 8 }}>{h.desc}</p>
              <div className="label" style={{ color: "var(--gold)", fontSize: 12, marginTop: 14 }}>
                Découvrir →
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* TOUTES LES SECTIONS */}
      <section className="wrap" style={{ marginTop: 56 }}>
        <div className="shead">
          <span className="kicker">Explorer</span>
          <h2>Tout le hub</h2>
        </div>
        <div className="grid-cards">
          {NAV.map((s) => (
            <Link key={s.href} href={s.href} className="card card-hover">
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 22 }}>{s.emoji}</span>
                <span className="display" style={{ fontSize: 17 }}>{s.label}</span>
              </div>
              <p style={{ color: "var(--muted)", fontSize: 14, marginTop: 10 }}>{s.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* BANDEAU CROUPIER */}
      <section className="wrap" style={{ marginTop: 64 }}>
        <div className="felt" style={{ padding: "40px 28px" }}>
          <div style={{ maxWidth: 680 }}>
            <div className="label" style={{ color: "#fbe8c2", fontSize: 12, marginBottom: 12 }}>
              Académie Croupier Poker · 100% gratuite
            </div>
            <h2 style={{ fontSize: "clamp(26px, 5vw, 42px)", color: "#ffffff", margin: 0 }}>
              Apprends le métier de dealer poker
            </h2>
            <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 17, marginTop: 14 }}>
              Manipulation des jetons et des cartes, gestion du pot, side pots, rake, annonces,
              situations cash game et tournoi, gestion des litiges... 10 modules et un examen final
              certifié. Le savoir d&apos;un vrai croupier, transmis gratuitement.
            </p>
            <Link href="/academie-croupier" className="btn btn-gold" style={{ marginTop: 22 }}>
              Entrer dans l&apos;académie
            </Link>
          </div>
        </div>
      </section>

      <div style={{ height: 24 }} />
    </>
  );
}
