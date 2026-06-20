import type { Metadata } from "next";
import { GLOSSARY } from "@/lib/poker/glossary";
import { GlossaryBrowser } from "@/components/GlossaryBrowser";
import { Crumbs, PageHero, JsonLd } from "@/components/ui";

export const metadata: Metadata = {
  title: "Glossaire poker complet : tous les termes de A à Z, expliqués",
  description:
    "Le dictionnaire du poker : plus de 300 termes définis simplement, " +
    "avec exemples. Bluff, range, ICM, pot odds, cbet, squeeze... cherchez, trouvez, comprenez.",
  alternates: { canonical: "/glossaire" },
};

export default function GlossairePage() {
  const defLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "Glossaire poker, Jérôme Ibiza",
    hasDefinedTerm: GLOSSARY.map((t) => ({
      "@type": "DefinedTerm",
      name: t.term,
      description: t.def,
    })),
  };

  return (
    <div className="wrap">
      <JsonLd data={defLd} />
      <Crumbs items={[{ label: "Accueil", href: "/" }, { label: "Glossaire" }]} />
      <PageHero
        kicker="Dictionnaire du poker"
        title="Glossaire poker complet"
        intro="Tous les mots du poker, définis simplement et illustrés d'exemples concrets. Tape un terme dans la recherche ou filtre par lettre. Un doute en pleine partie ? La réponse est ici."
      />
      <div style={{ marginTop: 28 }}>
        <GlossaryBrowser terms={GLOSSARY} />
      </div>

      <div className="card" style={{ marginTop: 32, borderColor: "rgba(232,176,75,0.3)" }}>
        <div className="label" style={{ color: "var(--gold)", fontSize: 12 }}>Plus de 300 termes</div>
        <p style={{ marginTop: 8, color: "var(--muted)" }}>
          Du B-A-BA aux concepts GTO, des surnoms de mains au vocabulaire du croupier : le dico est
          taillé pour répondre à n&apos;importe quel doute en pleine partie. Un mot te manque encore ?
          Il sera ajouté avec plaisir.
        </p>
      </div>
    </div>
  );
}
