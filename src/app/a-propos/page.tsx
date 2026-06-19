import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { Crumbs, Section, JsonLd } from "@/components/ui";

export const metadata: Metadata = {
  title: "À propos — Jérôme Ibiza, croupier professionnel",
  description:
    "Qui est derrière le Poker Hub ? Jérôme Ibiza, croupier professionnel et passionné de poker, " +
    "qui transmet gratuitement le poker des deux côtés du tapis : pour jouer, et pour devenir croupier.",
  alternates: { canonical: "/a-propos" },
};

export default function AProposPage() {
  const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Jérôme Ibiza",
    jobTitle: "Croupier professionnel",
    description:
      "Croupier professionnel et passionné de poker, fondateur du Poker Hub Jérôme Ibiza.",
    url: `${SITE.url}/a-propos`,
  };

  return (
    <div className="wrap">
      <JsonLd data={personLd} />
      <Crumbs items={[{ label: "Accueil", href: "/" }, { label: "À propos" }]} />

      {/* HERO présentation */}
      <section
        style={{
          display: "grid",
          gap: 28,
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          alignItems: "center",
          marginTop: 12,
        }}
      >
        <div>
          <div className="label" style={{ color: "var(--gold)", fontSize: 13, marginBottom: 14 }}>
            À propos
          </div>
          <h1 style={{ fontSize: "clamp(36px, 7vw, 64px)", margin: 0 }}>Jérôme Ibiza</h1>
          <div className="label" style={{ color: "var(--muted)", fontSize: 15, marginTop: 12, letterSpacing: 1.5 }}>
            Croupier professionnel · Passionné de poker
          </div>
          <p style={{ color: "var(--muted)", fontSize: 18, marginTop: 20, lineHeight: 1.7, maxWidth: 560 }}>
            Derrière ce Poker Hub, il y a un croupier de métier. J&apos;ai passé des années derrière
            la table : distribuer, gérer les pots, prélever le rake et arbitrer les litiges dans le
            feu de l&apos;action.
          </p>
          <p style={{ color: "var(--muted)", fontSize: 18, marginTop: 14, lineHeight: 1.7, maxWidth: 560 }}>
            Le poker, je le connais des <strong style={{ color: "var(--fg)" }}>deux côtés du tapis</strong> :
            celui qui distribue et celui qui joue. Mon objectif avec ce site, c&apos;est de transmettre
            ce savoir simplement et gratuitement — que tu veuilles jouer ta première main ou passer un
            jour de l&apos;autre côté de la table, comme croupier.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 26 }}>
            <Link href="/academie-croupier" className="btn btn-gold">🎓 L&apos;académie croupier</Link>
            <Link href="/apprendre/parcours-debutant" className="btn btn-ghost">Le parcours débutant</Link>
          </div>
        </div>

        {/* Photo détourée sur fond feutre */}
        <div
          className="felt"
          style={{
            position: "relative",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            minHeight: 320,
            padding: "24px 16px 0",
            overflow: "hidden",
          }}
        >
          <Image
            src="/jerome-cutout.png"
            alt="Jérôme Ibiza, croupier professionnel, en gilet et nœud papillon"
            width={1100}
            height={775}
            priority
            sizes="(max-width: 700px) 90vw, 520px"
            style={{ width: "100%", maxWidth: 520, height: "auto", display: "block", filter: "drop-shadow(0 18px 30px rgba(0,0,0,0.45))" }}
          />
        </div>
      </section>

      {/* MISSION */}
      <Section kicker="Pourquoi ce site" title="Ma mission">
        <div className="grid-cards">
          {[
            ["🎓 Transmettre", "Rendre le poker accessible à tous, des règles de base jusqu'aux concepts avancés, sans jargon inutile."],
            ["🆓 100% gratuit", "Apprendre, s'entraîner et même se former au métier de croupier, sans payer un centime."],
            ["🎯 Du vrai", "Le savoir d'un croupier de métier, pas des recettes recopiées : des explications justes et concrètes."],
          ].map(([t, d]) => (
            <div key={t} className="card">
              <div className="display" style={{ fontSize: 17 }}>{t}</div>
              <p style={{ color: "var(--muted)", fontSize: 14, marginTop: 8 }}>{d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* LE CROUPIER */}
      <Section kicker="Le croupier derrière le hub" title="Des deux côtés du tapis">
        <div className="card">
          <ul className="lb">
            <li>Croupier professionnel : la table, les cartes, les jetons et les règles, je les vis au quotidien.</li>
            <li>Joueur de poker : je sais ce que ça fait d&apos;être assis de l&apos;autre côté, à devoir décider.</li>
            <li>Pédagogue : j&apos;explique comme j&apos;aurais aimé qu&apos;on m&apos;explique en débutant.</li>
            <li>Une conviction : le poker est un jeu d&apos;adresse qui s&apos;apprend, et la formation doit être libre et gratuite.</li>
          </ul>
        </div>
      </Section>

      {/* CTA */}
      <section style={{ marginTop: 40 }}>
        <div className="felt" style={{ padding: "34px 26px" }}>
          <div style={{ maxWidth: 640 }}>
            <h2 style={{ fontSize: "clamp(24px, 4.5vw, 38px)", color: "#fff", margin: 0 }}>
              On commence par quoi ?
            </h2>
            <p style={{ color: "rgba(255,255,255,0.88)", fontSize: 16, marginTop: 12 }}>
              Apprends à jouer avec le parcours débutant, ou découvre le métier avec l&apos;académie
              croupier. Dans les deux cas, c&apos;est gratuit et ça commence maintenant.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 20 }}>
              <Link href="/apprendre/parcours-debutant" className="btn btn-gold">Apprendre le poker</Link>
              <Link href="/academie-croupier" className="btn btn-ghost" style={{ color: "#fff", borderColor: "rgba(255,255,255,0.4)" }}>
                Devenir croupier
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
