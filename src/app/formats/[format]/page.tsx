import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LessonLayout } from "@/components/LessonLayout";
import { PokerTable, TABLE_6MAX } from "@/components/PokerTable";
import { FORMATS, getFormat } from "@/lib/poker/formats";
import { Crumbs, Section, DealerNote, JsonLd } from "@/components/ui";

type Params = { format: string };

export function generateStaticParams(): Params[] {
  return FORMATS.map((f) => ({ format: f.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { format: slug } = await params;
  const f = getFormat(slug);
  if (!f) return { title: "Format introuvable" };
  return {
    title: `${f.name} au poker : règles, stratégie et conseils`,
    description: f.summary,
    alternates: { canonical: `/formats/${f.slug}` },
  };
}

export default async function FormatPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { format: slug } = await params;
  const f = getFormat(slug);
  if (!f) notFound();

  const idx = FORMATS.findIndex((x) => x.slug === f.slug);
  const prev = idx > 0 ? FORMATS[idx - 1] : null;
  const next = idx < FORMATS.length - 1 ? FORMATS[idx + 1] : null;

  const ld = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${f.name} au poker`,
    description: f.summary,
    inLanguage: "fr-FR",
    author: { "@type": "Person", name: "Jérôme Ibiza" },
  };

  return (
    <LessonLayout sidebarTitle="Formats" indexHref="/formats" items={FORMATS.map((x) => ({ label: x.name, href: `/formats/${x.slug}` }))}>
      <JsonLd data={ld} />
      <Crumbs
        items={[
          { label: "Accueil", href: "/" },
          { label: "Formats", href: "/formats" },
          { label: f.name },
        ]}
      />

      <div style={{ paddingBlock: "20px 0" }}>
        <div className="label" style={{ color: "var(--gold)", fontSize: 12, marginBottom: 10 }}>
          Format de poker · Variance {f.variance.toLowerCase()}
        </div>
        <h1 style={{ fontSize: "clamp(28px, 5.5vw, 48px)", margin: 0 }}>
          <span style={{ marginRight: 12 }}>{f.emoji}</span>
          {f.name}
        </h1>
        <p style={{ color: "var(--muted)", fontSize: 18, marginTop: 14, maxWidth: 720, lineHeight: 1.6 }}>
          {f.summary}
        </p>
      </div>

      <PokerTable seats={TABLE_6MAX} center={f.name} caption={f.tagline} />

      <Section kicker="Pour qui" title="À qui ce format convient">
        <div className="card">
          <p style={{ color: "var(--fg)", fontSize: 16 }}>{f.bestFor}</p>
        </div>
      </Section>

      <Section kicker="Le bilan" title="Avantages et inconvénients">
        <div style={{ display: "grid", gap: 14, gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
          <div className="card">
            <div className="label" style={{ color: "#9cc4f5", fontSize: 12 }}>Les plus</div>
            <ul className="lb check" style={{ marginTop: 10 }}>
              {f.pros.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
          <div className="card">
            <div className="label" style={{ color: "#f3a0a0", fontSize: 12 }}>Les moins</div>
            <ul className="lb" style={{ marginTop: 10 }}>
              {f.cons.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {f.sections.map((s) => (
        <Section key={s.heading} kicker="À savoir" title={s.heading}>
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

      {f.dealerNote && <div style={{ marginTop: 24 }}><DealerNote>{f.dealerNote}</DealerNote></div>}

      {f.partner && (
        <Section kicker="Aller plus loin" title="Formation spécialisée recommandée">
          <div className="card" style={{ borderColor: "rgba(232,176,75,0.35)" }}>
            <div
              style={{
                display: "flex",
                gap: 16,
                alignItems: "center",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              <div style={{ flex: "1 1 280px" }}>
                <div className="display" style={{ fontSize: 18 }}>{f.partner.name}</div>
                <p style={{ color: "var(--muted)", fontSize: 14, marginTop: 8, marginBottom: 0 }}>
                  {f.partner.blurb}
                </p>
              </div>
              <a
                href={f.partner.url}
                target="_blank"
                rel="sponsored noopener noreferrer"
                className="btn btn-gold"
              >
                Découvrir {f.partner.name} →
              </a>
            </div>
            <p style={{ color: "var(--faint)", fontSize: 12, marginTop: 14, marginBottom: 0 }}>
              Lien partenaire. Jérôme ne recommande que des formations qu&apos;il juge sérieuses. 18+,
              jouez responsable.
            </p>
          </div>
        </Section>
      )}

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
          <Link href={`/formats/${prev.slug}`} className="btn btn-ghost">
            ← {prev.name}
          </Link>
        ) : (
          <Link href="/formats" className="btn btn-ghost">← Tous les formats</Link>
        )}
        {next ? (
          <Link href={`/formats/${next.slug}`} className="btn btn-gold">
            {next.name} →
          </Link>
        ) : (
          <Link href="/formats" className="btn btn-gold">Retour aux formats →</Link>
        )}
      </nav>
    </LessonLayout>
  );
}
