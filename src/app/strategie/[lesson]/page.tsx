import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LESSONS, getLesson, LEVEL_LABEL } from "@/lib/poker/strategy";
import { Crumbs, Section, DealerNote, LevelPill, JsonLd } from "@/components/ui";

type Params = { lesson: string };

export function generateStaticParams(): Params[] {
  return LESSONS.map((l) => ({ lesson: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { lesson: slug } = await params;
  const l = getLesson(slug);
  if (!l) return { title: "Cours introuvable" };
  return {
    title: `${l.title} | Stratégie poker ${LEVEL_LABEL[l.level]}`,
    description: l.summary,
    alternates: { canonical: `/strategie/${l.slug}` },
  };
}

export default async function LessonPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { lesson: slug } = await params;
  const l = getLesson(slug);
  if (!l) notFound();

  const idx = LESSONS.findIndex((x) => x.slug === l.slug);
  const prev = idx > 0 ? LESSONS[idx - 1] : null;
  const next = idx < LESSONS.length - 1 ? LESSONS[idx + 1] : null;

  const learnLd = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: l.title,
    description: l.summary,
    educationalLevel: LEVEL_LABEL[l.level],
    isPartOf: { "@type": "Course", name: "Stratégie poker, Jérôme Ibiza" },
    inLanguage: "fr-FR",
    isAccessibleForFree: true,
    timeRequired: `PT${l.minutes}M`,
  };

  return (
    <div className="wrap">
      <JsonLd data={learnLd} />
      <Crumbs
        items={[
          { label: "Accueil", href: "/" },
          { label: "Stratégie", href: "/strategie" },
          { label: l.short },
        ]}
      />

      <div style={{ paddingBlock: "20px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <LevelPill level={l.level} />
          <span className="label" style={{ color: "var(--faint)", fontSize: 12 }}>
            {l.minutes} min de lecture
          </span>
        </div>
        <h1 style={{ fontSize: "clamp(28px, 5.5vw, 48px)", margin: 0, maxWidth: 820 }}>{l.title}</h1>
        <p style={{ color: "var(--muted)", fontSize: 18, marginTop: 14, maxWidth: 720, lineHeight: 1.6 }}>
          {l.summary}
        </p>
      </div>

      {l.sections.map((s) => (
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

      <Section kicker="À retenir" title="Les points clés">
        <ul className="lb check">
          {l.takeaways.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </Section>

      {l.dealerNote && <div style={{ marginTop: 24 }}><DealerNote>{l.dealerNote}</DealerNote></div>}

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
          <Link href={`/strategie/${prev.slug}`} className="btn btn-ghost">
            ← {prev.short}
          </Link>
        ) : (
          <Link href="/strategie" className="btn btn-ghost">← Tous les cours</Link>
        )}
        {next ? (
          <Link href={`/strategie/${next.slug}`} className="btn btn-gold">
            {next.short} →
          </Link>
        ) : (
          <Link href="/strategie" className="btn btn-gold">Retour à la stratégie →</Link>
        )}
      </nav>
    </div>
  );
}
