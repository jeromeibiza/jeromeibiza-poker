import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LessonLayout } from "@/components/LessonLayout";
import { PokerTable, TABLE_6MAX } from "@/components/PokerTable";
import { ARTICLES, getArticle } from "@/lib/poker/online";
import { Crumbs, Section, DealerNote, JsonLd, SeeAlso } from "@/components/ui";
import { autolink } from "@/lib/poker/autolink";
import { seeAlsoForArticle } from "@/lib/poker/related";

type Params = { article: string };

export function generateStaticParams(): Params[] {
  return ARTICLES.map((a) => ({ article: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { article: slug } = await params;
  const a = getArticle(slug);
  if (!a) return { title: "Article introuvable" };
  return {
    title: `${a.title} | Poker en ligne`,
    description: a.summary,
    alternates: { canonical: `/poker-en-ligne/${a.slug}` },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { article: slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();

  const idx = ARTICLES.findIndex((x) => x.slug === a.slug);
  const prev = idx > 0 ? ARTICLES[idx - 1] : null;
  const next = idx < ARTICLES.length - 1 ? ARTICLES[idx + 1] : null;
  const linked = new Set<string>(); // maillage : 1 lien par terme et par page

  const ld = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.summary,
    inLanguage: "fr-FR",
    author: { "@type": "Person", name: "Jérôme Ibiza" },
  };

  return (
    <LessonLayout sidebarTitle="Poker en ligne" indexHref="/poker-en-ligne" items={ARTICLES.map((x) => ({ label: x.short, href: `/poker-en-ligne/${x.slug}` }))}>
      <JsonLd data={ld} />
      <Crumbs
        items={[
          { label: "Accueil", href: "/" },
          { label: "Poker en ligne", href: "/poker-en-ligne" },
          { label: a.short },
        ]}
      />

      <div style={{ paddingBlock: "20px 0" }}>
        <div className="label" style={{ color: "var(--gold)", fontSize: 12, marginBottom: 10 }}>
          Guide poker en ligne
        </div>
        <h1 style={{ fontSize: "clamp(28px, 5.5vw, 46px)", margin: 0, maxWidth: 820 }}>{a.title}</h1>
        <p style={{ color: "var(--muted)", fontSize: 18, marginTop: 14, maxWidth: 720, lineHeight: 1.6 }}>
          {a.summary}
        </p>
      </div>

      <PokerTable seats={TABLE_6MAX} center={a.short} caption={a.summary.split(". ")[0] + "."} />

      {a.sections.map((s) => (
        <Section key={s.heading} kicker="Le guide" title={s.heading}>
          {s.body && <p style={{ color: "var(--muted)", fontSize: 16, lineHeight: 1.7 }}>{autolink(s.body, linked)}</p>}
          {s.bullets && (
            <ul className="lb" style={{ marginTop: s.body ? 14 : 0 }}>
              {s.bullets.map((b) => (
                <li key={b}>{autolink(b, linked)}</li>
              ))}
            </ul>
          )}
        </Section>
      ))}

      <Section kicker="À retenir" title="Les points clés">
        <ul className="lb check">
          {a.takeaways.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </Section>

      {a.dealerNote && <div style={{ marginTop: 24 }}><DealerNote>{a.dealerNote}</DealerNote></div>}

      <div className="card" style={{ marginTop: 24, borderColor: "rgba(232,176,75,0.25)" }}>
        <p style={{ color: "var(--muted)", fontSize: 14 }}>
          Rappel : le poker doit rester un plaisir. Fixe-toi un budget de loisir, joue 18+, et en cas
          de difficulté avec le jeu d&apos;argent, parles-en et fais-toi aider.
        </p>
      </div>

      <SeeAlso links={a.related ?? seeAlsoForArticle(a.slug)} />

      <nav
        style={{
          marginTop: 28,
          display: "flex",
          gap: 12,
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        {prev ? (
          <Link href={`/poker-en-ligne/${prev.slug}`} className="btn btn-ghost">
            ← {prev.short}
          </Link>
        ) : (
          <Link href="/poker-en-ligne" className="btn btn-ghost">← Tout le guide</Link>
        )}
        {next ? (
          <Link href={`/poker-en-ligne/${next.slug}`} className="btn btn-gold">
            {next.short} →
          </Link>
        ) : (
          <Link href="/poker-en-ligne" className="btn btn-gold">Retour au guide →</Link>
        )}
      </nav>
    </LessonLayout>
  );
}
