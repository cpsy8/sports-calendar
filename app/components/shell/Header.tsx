"use client";

import { useSyncExternalStore } from "react";
import type { View } from "./Rail";

const CRUMBS: Record<View, string[]> = {
  home:    ["Matchday", "Today"],
  football:["Matchday", "Football"],
  f1:      ["Matchday", "Formula 1"],
  cricket: ["Matchday", "Cricket"],
};

/* ---- Theme store (MutationObserver on data-theme attr) ---- */
function getThemeSnapshot(): string {
  if (typeof document === "undefined") return "stadium";
  return document.documentElement.getAttribute("data-theme") ?? "stadium";
}
const themeListeners = new Set<() => void>();
if (typeof window !== "undefined") {
  new MutationObserver(() => themeListeners.forEach((cb) => cb())).observe(
    document.documentElement,
    { attributes: true, attributeFilter: ["data-theme"] }
  );
}
function subscribeTheme(cb: () => void) {
  themeListeners.add(cb);
  return () => themeListeners.delete(cb);
}

const IconSearch = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="14" height="14">
    <circle cx="11" cy="11" r="7" />
    <path d="M20 20l-3.5-3.5" />
  </svg>
);
const IconSun = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="16" height="16">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.5 5.5l1.5 1.5M17 17l1.5 1.5M18.5 5.5L17 7M7 17l-1.5 1.5" />
  </svg>
);
const IconMoon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="16" height="16">
    <path d="M20 14.5A8 8 0 1 1 9.5 4a6 6 0 0 0 10.5 10.5z" />
  </svg>
);

export function Header({ view }: { view: View }) {
  const theme = useSyncExternalStore(subscribeTheme, getThemeSnapshot, () => "stadium");
  const crumbs = CRUMBS[view];

  function toggleTheme() {
    const next = theme === "light" ? "stadium" : "light";
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("md-theme", next); } catch (_) {}
  }

  return (
    <header className="header">
      <div className="header-left">
        <div className="brand">
          Match
          <span
            style={{
              color: "var(--ink-3)",
              fontWeight: 400,
              fontFamily: "var(--serif)",
              fontStyle: "italic",
              letterSpacing: 0,
            }}
          >
            Day
          </span>
          <span className="dot" />
        </div>

        <div className="crumbs">
          {crumbs.map((c, i) => (
            <span key={i}>
              {i > 0 && <span className="sep">›</span>}
              <span className={i === crumbs.length - 1 ? "cur" : ""}>{c}</span>
            </span>
          ))}
        </div>
      </div>

      <div className="header-right">
        <div className="search">
          <IconSearch />
          <input placeholder="Search teams, competitions…" readOnly />
        </div>

        <button
          className="icon-btn"
          onClick={toggleTheme}
          aria-label={theme === "light" ? "Switch to dark" : "Switch to light"}
        >
          {theme === "light" ? <IconMoon /> : <IconSun />}
        </button>
      </div>
    </header>
  );
}
