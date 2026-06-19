import Link from "next/link";
import type { Metadata } from "next";
import { NAV, SITE } from "@/lib/site";
import { Hand } from "@/components/PlayingCard";
import { JsonLd } from "@/components/ui";

export const metadata: Metadata = {
  title: "Poker Hub — Apprendre le poker, jouer gratuitement & devenir croupier",
  description:
    "Le centre de ressources poker francophone : regles, classement des mains, " +
    "strategie debutant a avance, glossaire geant, calculateurs et la seule academie " +
    "gratuite pour devenir croupier poker. Par Jerome Ibiza, croupier professionnel.",
  alternates: { canonical: "/" },
};

const HIGHLIGHTS = [
  {
    href: "/apprendre/regles-du-poker",
    emoji: "♠",
    title: "Debuter en 15 minutes",
    desc: "Les regles du Texas Hold'em expliquees simplement, de la donne au showdown.",
  },
  {
    href: "/apprendre/classement-des-mains",
    emoji: "🃏",
    title: "Classement des mains",
    desc: "Les 10 mains, leurs probabilites et des exemples visuels avec de vraies cartes.",
  },
  {
    href: "/academie-croupier",
    emoji: "🎓",
    title: "Devenir croupier — gratuit",
    desc: "10 modules pour apprendre le metier de dealer poker, par un croupier pro.",
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

      {/* HERO */}
      <section className="wrap" style={{ paddingBlock: "56px 24px" }}>
        <div>
          <div className="label" style={{ color: "var(--gold)", fontSize: 13, marginBottom: 16 }}>
            Le centre de ressources poker francophone
          </div>
          <h1 style={{ fontSize: "clamp(38px, 8vw, 76px)", margin: 0 }}>
            <span style={{ display: "block" }}>Apprends.</span>
            <span style={{ display: "block", color: "var(--gold)" }}>Joue.</span>
            <span style={{ display: "block" }}>Deviens croupier.</span>
          </h1>
          <p style={{ color: "var(--muted)", fontSize: 19, marginTop: 22, maxWidth: 620, lineHeight: 1.6 }}>
            Tout le poker au meme endroit : des regles pour grands debutants jusqu&apos;au GTO,
            un glossaire geant, des calculateurs, et la seule{" "}
            <strong style={{ color: "var(--fg)" }}>academie gratuite de croupier</strong> du web
            francophone — animee par Jerome Ibiza, croupier professionnel.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 28 }}>
            <Link href="/apprendre" className="btn btn-gold">Commencer a apprendre</Link>
            <Link href="/academie-croupier" className="btn btn-ghost">🎓 Formation croupier</Link>
          </div>
          <div style={{ marginTop: 32 }}>
            <Hand cards={["As", "Ks", "Qs", "Js", "Ts"]} size={1.05} />
            <p className="label" style={{ color: "var(--faint)", fontSize: 11, marginTop: 10 }}>
              Quinte flush royale · la main imbattable
            </p>
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
                Decouvrir →
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
              Academie Croupier Poker · 100% gratuite
            </div>
            <h2 style={{ fontSize: "clamp(26px, 5vw, 42px)", color: "#ffffff", margin: 0 }}>
              Apprends le metier de dealer poker
            </h2>
            <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 17, marginTop: 14 }}>
              Manipulation des jetons et des cartes, gestion du pot, side pots, rake, annonces,
              situations cash game et tournoi, gestion des litiges... 10 modules et un examen final
              certifie. Le savoir d&apos;un vrai croupier, transmis gratuitement.
            </p>
            <Link href="/academie-croupier" className="btn btn-gold" style={{ marginTop: 22 }}>
              Entrer dans l&apos;academie
            </Link>
          </div>
        </div>
      </section>

      <div style={{ height: 24 }} />
    </>
  );
}
