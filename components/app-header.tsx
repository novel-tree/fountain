"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { Search, Menu, X } from "lucide-react";

interface AppHeaderProps {
  dict: {
    title: string;
    search: string;
    searchPlaceholder: string;
    nav: {
      index: string;
      novelists: string;
      novels: string;
      about: string;
    };
  };
}

export function AppHeader({ dict }: AppHeaderProps) {
  const pathname = usePathname();
  const params = useParams();
  const locale = (params?.locale as string) || "ja";
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Helper to determine if a link is active
  const isActive = (path: string) => {
    const segments = pathname.split("/").filter(Boolean);
    const currentPath = segments.slice(1).join("/") || "index.html";

    if (path === "index.html") {
      return segments.length <= 1;
    }

    return currentPath === path.replace(".html", "");
  };

  const navLinks = [
    { label: dict.nav.index, href: "index.html", id: "" },
    { label: dict.nav.novelists, href: "novelist.html", id: "novelists" },
    { label: dict.nav.novels, href: "novel.html", id: "novels" },
    { label: dict.nav.about, href: "about.html", id: "about" },
  ];

  return (
    <nav className="site-header" aria-label="Primary">
      <div className="container site-header-inner">
        <Link
          href={`/${locale}`}
          className="site-mark"
          aria-label={`${dict.title} — home`}
        >
          <span className="seal" aria-hidden="true">
            の
          </span>
          <span className="name">{dict.title}</span>
        </Link>

        <div className="site-header-nav-wrap">
          <div className="ui-navmenu">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={`/${locale}/${link.id}`}
                className="ui-navmenu-link"
                data-active={isActive(link.href)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="site-header-spacer"></div>

        <button
          className="site-header-search"
          type="button"
          aria-label="Search authors and novels"
        >
          <Search size={14} />
          <span>{dict.search}</span>
          <kbd>⌘K</kbd>
        </button>

        <button
          className="site-header-toggle"
          type="button"
          aria-label="Open menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <div className="ui-sheet" data-open={isMenuOpen}>
        <div className="ui-input" style={{ marginBottom: "16px", gap: "8px" }}>
          <Search size={16} />
          <span>{dict.searchPlaceholder}</span>
        </div>
        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={`/${locale}/${link.id}`}
            className="ui-navmenu-link"
            data-active={isActive(link.href)}
            onClick={() => setIsMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
