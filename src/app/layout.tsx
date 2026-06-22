import type { Metadata } from "next";
import { Anton, Oswald, Inter } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

// 3 polices MAX (convention maison) : Anton = titres, Oswald = labels, Inter = corps.
const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});
const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  display: "swap",
});
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} · ${SITE.tagline}`,
    template: `%s · ${SITE.shortName}`,
  },
  description: SITE.description,
  applicationName: SITE.shortName,
  authors: [{ name: SITE.author }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: SITE.locale,
    siteName: SITE.shortName,
    title: SITE.name,
    description: SITE.description,
    url: SITE.url,
    images: [{ url: "/og-table.jpg", width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.name,
    description: SITE.description,
    images: ["/og-table.jpg"],
  },
  robots: { index: true, follow: true },
};

// JSON-LD global : relie le site à Jérôme (autorité de marque + auteur prouvable
// sur chaque page). Le PSPC 2023 est la preuve clé. Les liens sociaux/Hendon Mob
// pourront être ajoutés dans `sameAs` quand Jérôme les fournira.
const siteLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      url: SITE.url,
      name: SITE.name,
      description: SITE.description,
      inLanguage: "fr-FR",
      publisher: { "@id": `${SITE.url}/#jerome` },
    },
    {
      "@type": "Person",
      "@id": `${SITE.url}/#jerome`,
      name: "Jérôme Ibiza",
      jobTitle: "Croupier professionnel",
      description:
        "Croupier professionnel et joueur de poker, 20e du PokerStars Players Championship (PSPC) 2023, fondateur du Poker Hub Jérôme Ibiza.",
      url: `${SITE.url}/a-propos`,
      award: "20e place, PokerStars Players Championship (PSPC) 2023",
      knowsAbout: ["Poker", "Croupier de poker", "Texas Hold'em", "Tournois de poker"],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      className={`${anton.variable} ${oswald.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteLd) }}
        />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
