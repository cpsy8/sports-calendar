"use client";

import { useState } from "react";
import { Rail, type View } from "./components/shell/Rail";
import { Header } from "./components/shell/Header";
import { TodaySection } from "./components/sections/TodaySection";
import { PremierLeagueSection } from "./components/sections/PremierLeagueSection";
import { UCLSection } from "./components/sections/UCLSection";
import { LaLigaSection } from "./components/sections/LaLigaSection";
import { SerieASection } from "./components/sections/SerieASection";
import { BundesligaSection } from "./components/sections/BundesligaSection";
import { Ligue1Section } from "./components/sections/Ligue1Section";
import { ISLSection } from "./components/sections/ISLSection";
import { EuropaLeagueSection } from "./components/sections/EuropaLeagueSection";
import { WorldCup2026Section } from "./components/sections/WorldCup2026Section";
import { F1Section } from "./components/sections/F1Section";
import { IPLSection } from "./components/sections/IPLSection";

type FootballCompId =
  | "pl" | "ucl" | "laliga" | "seriea"
  | "bundesliga" | "ligue1" | "isl" | "uel" | "wc2026";

interface FootballComp {
  id: FootballCompId;
  name: string;
  note: string;
  accent: string;
}

const FOOTBALL_COMPS: FootballComp[] = [
  { id: "pl",         name: "Premier League",   note: "England · Top Flight",   accent: "var(--acc-epd)"    },
  { id: "ucl",        name: "Champions League", note: "UEFA · Knockout",         accent: "var(--acc-ucc)"    },
  { id: "laliga",     name: "La Liga",          note: "Spain · Top Flight",      accent: "var(--acc-laliga)" },
  { id: "seriea",     name: "Serie A",          note: "Italy · Top Flight",      accent: "#008fd5"           },
  { id: "bundesliga", name: "Bundesliga",       note: "Germany · Top Flight",    accent: "#d20515"           },
  { id: "ligue1",     name: "Ligue 1",          note: "France · Top Flight",     accent: "#2293D1"           },
  { id: "isl",        name: "ISL",              note: "India · Super League",    accent: "#f5a623"           },
  { id: "uel",        name: "Europa League",    note: "UEFA · Knockout",         accent: "#f97316"           },
  { id: "wc2026",     name: "World Cup 2026",   note: "International",           accent: "#0d9488"           },
];

const PER_PAGE = 4;

function FootballCompDeck({
  activeComp,
  setActiveComp,
  accent,
}: {
  activeComp: FootballCompId;
  setActiveComp: (id: FootballCompId) => void;
  accent: string;
}) {
  const [deckPage, setDeckPage] = useState(0);
  const totalPages = Math.ceil(FOOTBALL_COMPS.length / PER_PAGE);

  return (
    <div className="comp-deck" style={{ "--accent": accent } as React.CSSProperties}>
      <div className="comp-deck-hd">
        <span className="comp-deck-title">Competition</span>
        <div className="comp-deck-pager">
          <span className="comp-deck-count">
            {deckPage + 1}{" "}
            <span style={{ color: "var(--ink-4)" }}>/ {totalPages}</span>
          </span>
          <button
            className="comp-deck-arrow"
            disabled={deckPage === 0}
            onClick={() => setDeckPage((p) => p - 1)}
            aria-label="Previous"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="14" height="14">
              <path d="M15 6l-6 6 6 6" />
            </svg>
          </button>
          <button
            className="comp-deck-arrow"
            disabled={deckPage >= totalPages - 1}
            onClick={() => setDeckPage((p) => p + 1)}
            aria-label="Next"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="14" height="14">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>

      <div className="comp-deck-window">
        <div
          className="comp-deck-track"
          style={{ transform: `translateX(calc(-${deckPage * 100}%))` }}
        >
          {Array.from({ length: totalPages }).map((_, page) => (
            <div className="comp-deck-page" key={page}>
              {FOOTBALL_COMPS.slice(
                page * PER_PAGE,
                page * PER_PAGE + PER_PAGE
              ).map((c) => (
                <button
                  key={c.id}
                  className={`comp-card${activeComp === c.id ? " on" : ""}`}
                  onClick={() => setActiveComp(c.id)}
                  style={{ "--accent": c.accent } as React.CSSProperties}
                >
                  <span
                    className="comp-card-mark"
                    style={{ background: c.accent }}
                  />
                  <span className="comp-card-name">{c.name}</span>
                  <span className="comp-card-note">{c.note}</span>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="comp-deck-dots">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            className={`comp-deck-dot${i === deckPage ? " on" : ""}`}
            onClick={() => setDeckPage(i)}
            aria-label={`Page ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function FootballView() {
  const [activeComp, setActiveComp] = useState<FootballCompId>("pl");
  const comp = FOOTBALL_COMPS.find((c) => c.id === activeComp)!;

  return (
    <div style={{ "--accent": comp.accent } as React.CSSProperties}>
      <div className="page-hd page-hd-football">
        <div className="page-hd-l">
          <h1>
            Football{" "}
            <span
              style={{
                color: "var(--ink-4)",
                fontFamily: "var(--serif)",
                fontStyle: "italic",
              }}
            >
              competitions
            </span>
          </h1>
          <div className="sub">{FOOTBALL_COMPS.length} competitions tracked</div>
        </div>

        <FootballCompDeck
          activeComp={activeComp}
          setActiveComp={setActiveComp}
          accent={comp.accent}
        />
      </div>

      <div style={{ marginTop: 22 }}>
        {activeComp === "pl"         && <PremierLeagueSection />}
        {activeComp === "ucl"        && <UCLSection />}
        {activeComp === "laliga"     && <LaLigaSection />}
        {activeComp === "seriea"     && <SerieASection />}
        {activeComp === "bundesliga" && <BundesligaSection />}
        {activeComp === "ligue1"     && <Ligue1Section />}
        {activeComp === "isl"        && <ISLSection />}
        {activeComp === "uel"        && <EuropaLeagueSection />}
        {activeComp === "wc2026"     && <WorldCup2026Section />}
      </div>
    </div>
  );
}

export default function Home() {
  const [view, setView] = useState<View>("home");

  return (
    <div className="app">
      <Rail view={view} setView={setView} />
      <Header view={view} />
      <main className="main">
        {view === "home"    && <TodaySection />}
        {view === "football" && <FootballView />}
        {view === "f1"     && <F1Section />}
        {view === "cricket" && <IPLSection />}
      </main>
    </div>
  );
}
