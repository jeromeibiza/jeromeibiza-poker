import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SITE } from "@/lib/site";
import { CROUPIER_GUIDES, getCroupierGuide } from "@/lib/poker/croupierGuides";
import { Crumbs, PageHero, Section, JsonLd } from "@/components/ui";
import { autolink } from "@/lib/poker/autolink";

type Params = { sujet: string };

export function generateStaticParams(): Params[] {
  return CROUPIER_GUIDES.map((g) => ({ sujet: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { sujet } = await params;
  const g = getCroupierGuide(sujet);
  if (!g) return { title: "Guide introuvable" };
  return {
    title: g.metaTitle,
    description: g.metaDescription,
    alternates: { canonical: `/croupier/${g.slug}` },
  };
}

export default async function CroupierGuidePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { sujet } = await params;
  const g = getCroupierGuide(sujet);
  if (!g) notFound();

  const base = SITE.url.replace(/\/$/, "");
  const linked = new Set<string>(); // maillage : 1 lien par terme et par page

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: g.title,
    description: g.metaDescription,
    inLanguage: "fr-FR",
    isAccessibleForFree: true,
    author: { "@type": "Person", "@id": `${base}/#jerome`, name: "Jérôme Ibiza" },
    mainEntityOfPage: `${base}/croupier/${g.slug}`,
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: g.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="wrap">
      <JsonLd data={[articleLd, faqLd, ...(g.structuredData ?? [])]} />
      <Crumbs
        items={[
          { label: "Accueil", href: "/" },
          { label: "Devenir croupier", href: "/devenir-croupier-de-poker" },
          { label: g.kicker },
        ]}
      />

      <PageHero kicker={g.kicker} title={g.title} intro={g.intro} />

      {g.sections.map((s) => (
        <Section key={s.heading} kicker="Le guide" title={s.heading}>
          {s.body && (
            <p style={{ color: "var(--muted)", fontSize: 16, lineHeight: 1.7, maxWidth: 760 }}>
              {autolink(s.body, linked)}
            </p>
          )}
          {s.bullets && (
            <ul className="lb" style={{ marginTop: s.body ? 14 : 0 }}>
              {s.bullets.map((b) => (
                <li key={b}>{autolink(b, linked)}</li>
              ))}
            </ul>
          )}
        </Section>
      ))}

      <Section kicker="Questions fréquentes" title="FAQ">
        <div style={{ display: "grid", gap: 12 }}>
          {g.faq.map((f) => (
            <details key={f.q} className="card">
              <summary className="display" style={{ fontSize: 15, cursor: "pointer" }}>{f.q}</summary>
              <p style={{ color: "var(--muted)", fontSize: 14, marginTop: 10, lineHeight: 1.6 }}>{f.a}</p>
            </details>
          ))}
        </div>
      </Section>

      <Section kicker="Pour aller plus loin" title="Voir aussi">
        <div className="grid-cards">
          {g.related.map((r) => (
            <Link key={r.href} href={r.href} className="card card-hover">
              <span className="display" style={{ fontSize: 15 }}>{r.label}</span>
              <span className="label" style={{ color: "var(--gold)", fontSize: 13, marginTop: 8, display: "block" }}>
                Découvrir →
              </span>
            </Link>
          ))}
        </div>
      </Section>
    </div>
  );
}
