"use client";

import React from "react";

export type View = "home" | "football" | "f1" | "cricket";

interface RailProps {
  view: View;
  setView: (v: View) => void;
}

const IconHome = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" width="22" height="22">
    <path d="M3 12L12 4l9 8M5 10v10h5v-6h4v6h5V10" />
  </svg>
);

const IconFootball = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" width="22" height="22">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 3v3M12 18v3M21 12h-3M6 12H3M5.5 5.5l2 2M16.5 16.5l2 2M18.5 5.5l-2 2M7.5 16.5l-2 2" />
    <path d="M12 8l3.5 2.5L14 14h-4l-1.5-3.5z" fill="currentColor" stroke="none" opacity=".5" />
  </svg>
);

const IconF1 = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" width="22" height="22">
    <path d="M3 14c2-3 6-4 10-4h7M3 18h18" />
    <circle cx="7.5" cy="18" r="2.2" fill="currentColor" />
    <circle cx="17" cy="18" r="2.2" fill="currentColor" />
  </svg>
);

const IconCricket = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" width="22" height="22">
    <path d="M14 4l6 6-9 9-3-3 9-9-3-3z" />
    <circle cx="6" cy="18" r="2" fill="currentColor" />
  </svg>
);

const IconSettings = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" width="22" height="22">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
  </svg>
);

const SPORT_BUTTONS: {
  id: View;
  label: string;
  Icon: React.FC;
  accent: string;
}[] = [
  { id: "football", label: "Football", Icon: IconFootball, accent: "var(--acc-epd)" },
  { id: "f1",       label: "Formula 1", Icon: IconF1,      accent: "var(--acc-f1)"  },
  { id: "cricket",  label: "Cricket",  Icon: IconCricket,  accent: "var(--acc-cricket)" },
];

export function Rail({ view, setView }: RailProps) {
  return (
    <aside className="rail">
      <div className="rail-logo">
        M<span className="rail-logo-full">Matchday</span>
      </div>

      <button
        className={`rail-btn${view === "home" ? " active" : ""}`}
        onClick={() => setView("home")}
        aria-label="Today"
      >
        <IconHome />
        <span className="rail-btn-label">Today</span>
      </button>

      <div className="rail-divider" />

      {SPORT_BUTTONS.map(({ id, label, Icon, accent }) => (
        <button
          key={id}
          className={`rail-btn${view === id ? " active" : ""}`}
          onClick={() => setView(id)}
          style={view === id ? ({ "--accent": accent } as React.CSSProperties) : {}}
          aria-label={label}
        >
          <Icon />
          <span className="rail-btn-label">{label}</span>
        </button>
      ))}

      <div style={{ flex: 1 }} />

      <button className="rail-btn" aria-label="Settings">
        <IconSettings />
        <span className="rail-btn-label">Settings</span>
      </button>
    </aside>
  );
}
