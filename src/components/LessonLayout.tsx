"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export type NavLink = { label: string; href: string };

/**
 * Met le contenu d'une leçon dans une colonne, avec à droite la liste des
 * autres leçons de la même catégorie (cliquables, leçon courante surlignée).
 * Sur mobile, la liste passe sous le contenu.
 */
export function LessonLayout({
  sidebarTitle,
  indexHref,
  items,
  children,
}: {
  sidebarTitle: string;
  indexHref?: string;
  items: NavLink[];
  children: ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="wrap lesson-layout">
      <div className="lesson-content">{children}</div>

      <aside className="lesson-aside" aria-label={`Autres leçons : ${sidebarTitle}`}>
        <div className="lesson-aside-inner">
          <div className="lesson-aside-head">
            <span className="label" style={{ color: "var(--gold)", fontSize: 11, letterSpacing: 2 }}>
              {sidebarTitle}
            </span>
            {indexHref && (
              <Link href={indexHref} className="lesson-aside-all">
                Tout voir
              </Link>
            )}
          </div>
          <nav>
            <ul className="lesson-aside-list">
              {items.map((it) => {
                const active = pathname === it.href;
                return (
                  <li key={it.href}>
                    <Link
                      href={it.href}
                      className={`lesson-aside-link${active ? " is-active" : ""}`}
                      aria-current={active ? "page" : undefined}
                    >
                      <span aria-hidden className="lesson-aside-dot">
                        {active ? "♠" : ""}
                      </span>
                      {it.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </aside>
    </div>
  );
}
