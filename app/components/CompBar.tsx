"use client";

import type { SportGroup } from "./Navbar";

export type CompId = "pl" | "ucl" | "laliga" | "seriea" | "bundesliga" | "wc2026" | "f1main" | "ipl";

interface CompTab {
  id: CompId;
  label: string;
  color: string;
}

const FOOTBALL_TABS: CompTab[] = [
  { id: "pl", label: "Premier League", color: "#3dffa2" },
  { id: "ucl", label: "Champions League", color: "#ffd700" },
  { id: "laliga", label: "La Liga", color: "#ff4b44" },
  { id: "seriea", label: "Serie A", color: "#008fd5" },
  { id: "bundesliga", label: "Bundesliga", color: "#d20515" },
  { id: "wc2026", label: "World Cup 2026", color: "#0066cc" },
];

const F1_TABS: CompTab[] = [
  { id: "f1main", label: "2026 Season", color: "#e10600" },
];

const CRICKET_TABS: CompTab[] = [
  { id: "ipl", label: "IPL 2026", color: "#f5a623" },
];

const GROUP_TABS: Partial<Record<SportGroup, CompTab[]>> = {
  football: FOOTBALL_TABS,
  f1: F1_TABS,
  cricket: CRICKET_TABS,
};

interface CompBarProps {
  activeGroup: SportGroup;
  activeComp: CompId;
  onCompChange: (comp: CompId) => void;
}

export function CompBar({ activeGroup, activeComp, onCompChange }: CompBarProps) {
  const tabs = GROUP_TABS[activeGroup];
  if (!tabs) return null;
  return (
    <div className="comp-bar">
      <div className="comp-bar-inner">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`comp-tab${activeComp === tab.id ? " active" : ""}`}
            onClick={() => onCompChange(tab.id)}
          >
            <span className="cdot" style={{ background: tab.color }} />
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
