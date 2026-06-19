import Link from "next/link";
import { Hand } from "@/components/PlayingCard";

export default function NotFound() {
  return (
    <div className="wrap" style={{ paddingBlock: "80px 60px", textAlign: "center" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Hand cards={["4c", "7d"]} size={1} />
      </div>
      <div className="label" style={{ color: "var(--gold)", fontSize: 12, marginTop: 24 }}>
        Erreur 404
      </div>
      <h1 style={{ fontSize: "clamp(30px, 7vw, 56px)", marginTop: 10 }}>Page introuvable</h1>
      <p style={{ color: "var(--muted)", fontSize: 17, marginTop: 14, maxWidth: 460, marginInline: "auto" }}>
        Cette page s&apos;est couchee avant le flop. Reviens a une valeur sure :
      </p>
      <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginTop: 24 }}>
        <Link href="/" className="btn btn-gold">Accueil</Link>
        <Link href="/apprendre" className="btn btn-ghost">Apprendre le poker</Link>
      </div>
    </div>
  );
}
