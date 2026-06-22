import Link from "next/link";
import type { ReactNode } from "react";
import { SITE } from "@/lib/site";

/** Fil d'Ariane (bon pour l'UX et le SEO). Émet aussi le JSON-LD BreadcrumbList
 *  (chemin d'accès indexable) en plus du rendu visuel. */
export function Crumbs({ items }: { items: { label: string; href?: string }[] }) {
  const base = SITE.url.replace(/\/$/, "");
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.label,
      ...(it.href ? { item: `${base}${it.href === "/" ? "" : it.href}` } : {}),
    })),
  };
  return (
    <nav aria-label="Fil d'Ariane" style={{ marginBottom: 18 }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <ol
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
          listStyle: "none",
          margin: 0,
          padding: 0,
          fontSize: 13,
          color: "var(--faint)",
        }}
      >
        {items.map((it, i) => (
          <li key={i} style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {it.href ? (
              <Link href={it.href} style={{ color: "var(--muted)" }}>
                {it.label}
              </Link>
            ) : (
              <span aria-current="page">{it.label}</span>
            )}
            {i < items.length - 1 && <span aria-hidden>/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** En-tete de page (hero) avec kicker + titre + intro. */
export function PageHero({
  kicker,
  title,
  intro,
  children,
}: {
  kicker?: string;
  title: string;
  intro?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div style={{ paddingBlock: "28px 8px" }}>
      {kicker && (
        <div className="label" style={{ color: "var(--gold)", fontSize: 12, marginBottom: 10 }}>
          {kicker}
        </div>
      )}
      <h1 style={{ fontSize: "clamp(30px, 6vw, 56px)", margin: 0, maxWidth: 880 }}>{title}</h1>
      {intro && (
        <p style={{ color: "var(--muted)", fontSize: 18, marginTop: 16, maxWidth: 720, lineHeight: 1.6 }}>
          {intro}
        </p>
      )}
      {children}
    </div>
  );
}

/** Bloc de section avec en-tete uniforme (.shead). */
export function Section({
  kicker,
  title,
  children,
  id,
}: {
  kicker?: string;
  title: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <section id={id} style={{ marginTop: 44, scrollMarginTop: 80 }}>
      <div className="shead">
        {kicker && <span className="kicker">{kicker}</span>}
        <h2>{title}</h2>
      </div>
      {children}
    </section>
  );
}

/** Niveau (debutant / intermediaire / avance) sous forme de pastille. */
export function LevelPill({ level }: { level: "debutant" | "intermediaire" | "avance" }) {
  const map = {
    debutant: { cls: "pill-beginner", label: "Debutant" },
    intermediaire: { cls: "pill-inter", label: "Intermediaire" },
    avance: { cls: "pill-advanced", label: "Avance" },
  } as const;
  const m = map[level];
  return <span className={`pill ${m.cls}`}>{m.label}</span>;
}

/** Injecte un bloc JSON-LD (schema.org) pour le SEO. */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Bloc « Voir aussi » : maillage interne cross-thématique en bas de page.
 *  Tisse des liens entre apprendre / stratégie / formats / glossaire / académie. */
export function SeeAlso({
  links,
  title = "Voir aussi",
  kicker = "Pour aller plus loin",
}: {
  links: { label: string; href: string; desc?: string }[];
  title?: string;
  kicker?: string;
}) {
  if (!links.length) return null;
  return (
    <Section kicker={kicker} title={title}>
      <div className="grid-cards">
        {links.map((l) => (
          <Link key={l.href} href={l.href} className="card card-hover">
            <span className="display" style={{ fontSize: 15 }}>{l.label}</span>
            {l.desc && (
              <span style={{ display: "block", color: "var(--muted)", fontSize: 13, marginTop: 6 }}>{l.desc}</span>
            )}
            <span className="label" style={{ color: "var(--gold)", fontSize: 13, marginTop: 8, display: "block" }}>
              Découvrir →
            </span>
          </Link>
        ))}
      </div>
    </Section>
  );
}

/** Encart "note du croupier", signature editoriale de Jerome. */
export function DealerNote({ children }: { children: ReactNode }) {
  return (
    <aside
      className="card"
      style={{
        borderColor: "rgba(232,176,75,0.35)",
        background: "linear-gradient(180deg, rgba(232,176,75,0.07), rgba(24,35,32,0.6))",
        display: "flex",
        gap: 14,
        alignItems: "flex-start",
      }}
    >
      <span style={{ fontSize: 24, lineHeight: 1 }}>🎯</span>
      <div>
        <div className="label" style={{ color: "var(--gold)", fontSize: 12, marginBottom: 6 }}>
          La note du croupier
        </div>
        <div style={{ color: "var(--fg)", fontSize: 15 }}>{children}</div>
      </div>
    </aside>
  );
}
