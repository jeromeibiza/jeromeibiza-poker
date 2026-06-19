# Poker Hub — Jerome Ibiza

Centre de ressources poker francophone : apprendre le poker, jouer (a venir) et
**devenir croupier** grace a une academie gratuite. Anime par Jerome Ibiza,
croupier professionnel.

> ⚠️ **Projet SIDE** — totalement independant du site principal `jeromeibiza-app`.
> Repo dedie, deploiement Vercel dedie (futur `poker.jeromeibiza.com`).
> On ne touche jamais au site live ni a son DNS.

## Stack

- **Next.js 16** (App Router, Turbopack) · **React 19** · **Tailwind v4** · **TypeScript**
- Meme stack que le site principal → fusion future possible sans friction.

## Demarrer

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de prod
```

## Structure

```
src/
  app/                      # routes (App Router)
    apprendre/              # pilier SEO : regles, mains, positions, blindes, deroulement
    strategie/              # cours par niveau (debutant/inter/avance)
    formats/                # cash, MTT, SNG, Spin, HU, Short Deck, PLO, mixed
    poker-en-ligne/         # guide rooms/bonus/securite/KYC/trackers
    glossaire/              # dictionnaire (moteur de recherche)
    calculateurs/           # outils (cotes en ligne ; bankroll/ICM/rake/ROI a venir)
    videos/                 # "Netflix du poker" (WSOP/WPT/EPT/Triton)
    actualites/             # news + resultats
    academie-croupier/      # formation croupier (10 modules)
    sitemap.ts, robots.ts   # SEO technique
  components/               # UI partagee (header, footer, cartes, quiz, calculateur...)
  lib/
    site.ts                 # config + arborescence de nav
    poker/                  # data : hands, learn, glossary, academy
```

## Conventions design (maison)

- 3 polices MAX : **Anton** (titres) / **Oswald** (labels) / **Inter** (corps).
- Cadres **toujours arrondis** (`.card`), jamais carres ni bordure or pleine (l'or = accent).
- En-tetes de section uniformes (`.shead`), listes propres (`.lb`).
- Mobile-first, lisibilite avant tout.

## Suivi

Voir [`WAR_ROOM.md`](./WAR_ROOM.md) pour l'etat d'avancement et la roadmap.
