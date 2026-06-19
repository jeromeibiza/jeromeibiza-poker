import Link from "next/link";
import type { ReactNode } from "react";

/** Fil d'Ariane (bon pour l'UX et le SEO). */
export function Crumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Fil d'Ariane" style={{ marginBottom: 18 }}>
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

/** Encart "note du croupier" — signature editoriale de Jerome. */
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
