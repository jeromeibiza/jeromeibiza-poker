import Link from "next/link";
import { NAV, SITE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer style={{ borderTop: "1px solid var(--line)", marginTop: 64, paddingBlock: 40 }}>
      <div className="wrap">
        <div
          style={{
            display: "grid",
            gap: 28,
            gridTemplateColumns: "minmax(240px, 1.4fr) repeat(auto-fit, minmax(150px, 1fr))",
          }}
        >
          <div>
            <div className="display" style={{ fontSize: 20 }}>♠ Poker Hub</div>
            <p style={{ color: "var(--muted)", fontSize: 14, marginTop: 10, maxWidth: 320 }}>
              {SITE.tagline} Par{" "}
              <Link href="/a-propos" style={{ color: "var(--fg)", textDecoration: "underline" }}>
                Jérôme Ibiza
              </Link>
              , croupier professionnel et 20e du PSPC 2023.
            </p>
            <p style={{ color: "var(--faint)", fontSize: 12, marginTop: 14 }}>
              Contenu pédagogique et de divertissement. Jeu gratuit, sans argent réel,
              sans possibilité de gain ni de retrait. Réservé aux personnes majeures (18+).
            </p>
          </div>

          <nav aria-label="Sections" style={{ display: "grid", gap: 8 }}>
            <div className="label" style={{ color: "var(--gold)", fontSize: 12, marginBottom: 4 }}>
              Sections
            </div>
            {NAV.slice(0, 5).map((s) => (
              <Link key={s.href} href={s.href} style={{ color: "var(--muted)", fontSize: 14 }}>
                {s.label}
              </Link>
            ))}
          </nav>

          <nav aria-label="Plus" style={{ display: "grid", gap: 8 }}>
            <div className="label" style={{ color: "var(--gold)", fontSize: 12, marginBottom: 4 }}>
              Ressources
            </div>
            {NAV.slice(5).map((s) => (
              <Link key={s.href} href={s.href} style={{ color: "var(--muted)", fontSize: 14 }}>
                {s.label}
              </Link>
            ))}
            <Link href="/a-propos" style={{ color: "var(--muted)", fontSize: 14 }}>
              À propos
            </Link>
          </nav>
        </div>

        <div
          style={{
            marginTop: 30,
            paddingTop: 18,
            borderTop: "1px solid var(--line)",
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            justifyContent: "space-between",
            color: "var(--faint)",
            fontSize: 12,
          }}
        >
          <span>© {SITE.author}, Poker Hub. Tous droits réservés.</span>
          <span>18+ · Le jeu peut être dangereux : jouez avec modération.</span>
        </div>
      </div>
    </footer>
  );
}
