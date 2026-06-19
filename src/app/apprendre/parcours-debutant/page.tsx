import Link from "next/link";
import type { Metadata } from "next";
import { STEPS } from "@/lib/poker/parcours";
import { ParcoursDebutant } from "@/components/ParcoursDebutant";
import { Crumbs, PageHero, JsonLd } from "@/components/ui";

export const metadata: Metadata = {
  title: "Apprendre le poker de zéro : tutoriel pas à pas avec quiz et certificat",
  description:
    "Le parcours débutant interactif pour apprendre le poker de zéro : 6 étapes à valider une par " +
    "une avec un quiz à chaque palier, un examen final et un certificat. Gratuit, par Jérôme Ibiza.",
  alternates: { canonical: "/apprendre/parcours-debutant" },
};

export default function ParcoursDebutantPage() {
  const courseLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Apprendre le poker de zéro — parcours débutant",
    description:
      "Tutoriel interactif en 6 étapes avec quiz de validation et examen final certifié, pour " +
      "apprendre les bases du poker Texas Hold'em.",
    provider: { "@type": "Person", name: "Jérôme Ibiza" },
    inLanguage: "fr-FR",
    isAccessibleForFree: true,
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      courseWorkload: "PT35M",
    },
    syllabusSections: STEPS.map((s, i) => ({
      "@type": "Syllabus",
      name: `Étape ${i + 1} : ${s.title}`,
      description: s.intro,
    })),
  };

  return (
    <div className="wrap">
      <JsonLd data={courseLd} />
      <Crumbs
        items={[
          { label: "Accueil", href: "/" },
          { label: "Apprendre", href: "/apprendre" },
          { label: "Parcours débutant" },
        ]}
      />
      <PageHero
        kicker="Tutoriel interactif · gratuit"
        title="Apprendre le poker de zéro"
        intro="Un parcours à suivre étape par étape. À chaque palier, un court cours puis un quiz à valider pour débloquer la suite. À la fin, un examen final te délivre ton certificat débutant. Ta progression est sauvegardée sur cet appareil."
      />

      {/* Aperçu SEO du programme (rendu côté serveur) */}
      <section style={{ marginTop: 24 }}>
        <div className="shead">
          <span className="kicker">Le programme</span>
          <h2>6 étapes pour partir de zéro</h2>
        </div>
        <ul className="lb" style={{ marginBottom: 8 }}>
          {STEPS.map((s, i) => (
            <li key={s.id}>
              <strong>Étape {i + 1} — {s.title}</strong> : {s.intro}
            </li>
          ))}
          <li><strong>Examen final</strong> : 10 questions pour valider tout le parcours et obtenir le certificat.</li>
        </ul>
      </section>

      {/* Parcours interactif */}
      <div style={{ marginTop: 18 }}>
        <ParcoursDebutant />
      </div>

      <div className="card" style={{ marginTop: 28, borderColor: "rgba(232,176,75,0.3)" }}>
        <p style={{ color: "var(--muted)" }}>
          Tu veux le détail de chaque notion ? Chaque étape a sa page complète dans le{" "}
          <Link href="/apprendre" className="link">cursus Apprendre</Link>. Et une fois les bases
          validées, direction la{" "}
          <Link href="/strategie" className="link">stratégie</Link>.
        </p>
      </div>
    </div>
  );
}
