/**
 * Carte a jouer reutilisable. Format compact : "As" -> rank "A", suit "s".
 * Suits : s = pique (spades), h = coeur (hearts), d = carreau (diamonds), c = trefle (clubs).
 */

const SUIT_GLYPH: Record<string, string> = {
  s: "♠",
  h: "♥",
  d: "♦",
  c: "♣",
};

const RED_SUITS = new Set(["h", "d"]);

export type CardCode = string; // ex: "As", "Th", "9d", "Kc"

export function parseCard(code: CardCode): { rank: string; suit: string } {
  const suit = code.slice(-1).toLowerCase();
  let rank = code.slice(0, -1).toUpperCase();
  if (rank === "10") rank = "T";
  return { rank, suit };
}

export function PlayingCard({ code, size = 1 }: { code: CardCode; size?: number }) {
  const { rank, suit } = parseCard(code);
  const isRed = RED_SUITS.has(suit);
  const display = rank === "T" ? "10" : rank;
  return (
    <span
      className={`pcard${isRed ? " red" : ""}`}
      style={{
        width: 46 * size,
        height: 64 * size,
        fontSize: `${size}rem`,
      }}
      aria-label={`${display} de ${suitName(suit)}`}
    >
      <span className="rank">{display}</span>
      <span className="suit">{SUIT_GLYPH[suit] ?? "?"}</span>
    </span>
  );
}

export function Hand({ cards, size = 1 }: { cards: CardCode[]; size?: number }) {
  return (
    <span style={{ display: "inline-flex", gap: 6, flexWrap: "wrap" }}>
      {cards.map((c, i) => (
        <PlayingCard key={`${c}-${i}`} code={c} size={size} />
      ))}
    </span>
  );
}

function suitName(suit: string) {
  switch (suit) {
    case "s":
      return "pique";
    case "h":
      return "cœur";
    case "d":
      return "carreau";
    case "c":
      return "trèfle";
    default:
      return "inconnu";
  }
}
