import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LessonLayout } from "@/components/LessonLayout";
import { CroupierExam } from "@/components/CroupierExam";
import { MODULES, getModule } from "@/lib/poker/academy";
import { Crumbs, Section, DealerNote, JsonLd } from "@/components/ui";

type Params = { module: string };

export function generateStaticParams(): Params[] {
  return MODULES.map((m) => ({ module: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { module: slug } = await params;
  const m = getModule(slug);
  if (!m) return { title: "Module introuvable" };
  return {
    title: `Module ${m.n}, ${m.title} | Académie Croupier`,
    description: m.summary,
    alternates: { canonical: `/academie-croupier/${m.slug}` },
  };
}

export default async function ModulePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { module: slug } = await params;
  const m = getModule(slug);
  if (!m) notFound();

  const idx = MODULES.findIndex((x) => x.slug === m.slug);
  const prev = idx > 0 ? MODULES[idx - 1] : null;
  const next = idx < MODULES.length - 1 ? MODULES[idx + 1] : null;

  const learnLd = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: m.title,
    description: m.summary,
    educationalLevel: "Beginner",
    isPartOf: { "@type": "Course", name: "Académie Croupier Poker Jérôme Ibiza" },
    inLanguage: "fr-FR",
    isAccessibleForFree: true,
  };

  return (
    <LessonLayout sidebarTitle="Académie Croupier" indexHref="/academie-croupier" items={MODULES.map((x) => ({ label: `${x.n}. ${x.title}`, href: `/academie-croupier/${x.slug}` }))}>
      <JsonLd data={learnLd} />
      <Crumbs
        items={[
          { label: "Accueil", href: "/" },
          { label: "Académie Croupier", href: "/academie-croupier" },
          { label: `Module ${m.n}` },
        ]}
      />

      <div style={{ paddingBlock: "20px 0" }}>
        <div className="label" style={{ color: "var(--gold)", fontSize: 12, marginBottom: 10 }}>
          Module {String(m.n).padStart(2, "0")}
          {m.status === "plan" && " · plan détaillé"}
        </div>
        <h1 style={{ fontSize: "clamp(28px, 5.5vw, 48px)", margin: 0 }}>
          <span style={{ marginRight: 12 }}>{m.emoji}</span>
          {m.title}
        </h1>
        <p style={{ color: "var(--muted)", fontSize: 18, marginTop: 14, maxWidth: 700 }}>{m.summary}</p>
      </div>

      {m.image && (
        <figure className="module-hero">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={m.image} alt={`Illustration du module : ${m.title}`} loading="lazy" />
        </figure>
      )}

      <Section kicker="Ce que tu vas savoir faire" title="Objectifs du module">
        <ul className="lb check">
          {m.objectives.map((o) => (
            <li key={o}>{o}</li>
          ))}
        </ul>
      </Section>

      {m.sections.map((s) => (
        <Section key={s.heading} kicker="Cours" title={s.heading}>
          {s.body && <p style={{ color: "var(--muted)", fontSize: 16, lineHeight: 1.7 }}>{s.body}</p>}
          {s.bullets && (
            <ul className="lb" style={{ marginTop: s.body ? 14 : 0 }}>
              {s.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          )}
        </Section>
      ))}

      {m.slug === "examen-final" && (
        <Section kicker="L'examen" title="Passe ton examen de certification">
          <p style={{ color: "var(--muted)", marginTop: -4, marginBottom: 16 }}>
            Choisis l&apos;<strong>examen complet</strong> (100 questions) ou l&apos;<strong>examen rapide</strong>{" "}
            (40 tirées au hasard). Il te faut <strong>80% de bonnes réponses</strong> pour valider et
            décrocher ton certificat (téléchargeable à ton nom). Les questions sont mélangées à chaque
            tentative, et tu peux naviguer librement avant de terminer.
          </p>
          <CroupierExam />
        </Section>
      )}

      {m.status === "plan" && (
        <div className="card" style={{ marginTop: 28, borderColor: "rgba(232,176,75,0.3)" }}>
          <div className="label" style={{ color: "var(--gold)", fontSize: 12 }}>Module en cours de rédaction</div>
          <p style={{ marginTop: 8, color: "var(--muted)" }}>
            Le plan complet de ce module est établi ci-dessus. Le cours détaillé (textes, schémas et
            vidéos de démonstration) est en cours de production et sera publié progressivement.
          </p>
        </div>
      )}

      {m.n === 1 && (
        <DealerNote>
          Le métier ne s&apos;apprend pas qu&apos;en lisant : entraîne tes mains dès aujourd&apos;hui avec
          un vrai jeu de cartes et quelques jetons. Dix minutes de mélange et de distribution par
          jour valent plus que des heures de théorie.
        </DealerNote>
      )}

      {/* Navigation module précédent / suivant */}
      <nav
        style={{
          marginTop: 36,
          display: "flex",
          gap: 12,
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        {prev ? (
          <Link href={`/academie-croupier/${prev.slug}`} className="btn btn-ghost">
            ← Module {prev.n}
          </Link>
        ) : (
          <Link href="/academie-croupier" className="btn btn-ghost">← Tous les modules</Link>
        )}
        {next ? (
          <Link href={`/academie-croupier/${next.slug}`} className="btn btn-gold">
            Module {next.n} : {next.title} →
          </Link>
        ) : (
          <Link href="/academie-croupier" className="btn btn-gold">Retour au programme →</Link>
        )}
      </nav>
    </LessonLayout>
  );
}
