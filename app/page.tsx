"use client";

import { useState, useCallback, useEffect } from "react";
import type { Fixture } from "./lib/fixtures";
import { fetchFixturesClient, type SportId } from "./lib/fetch-fixtures-client";
import { HeaderBar } from "./components/HeaderBar";
import { SportSelector, type SportOption } from "./components/SportSelector";
import { FootballCard } from "./components/FootballCard";
import { F1Card } from "./components/F1Card";

const SPORT_OPTIONS: SportOption[] = [
  { id: "all", label: "All sports" },
  { id: "football", label: "Football" },
  { id: "f1", label: "F1" },
];

export default function Home() {
  const [centerDate, setCenterDate] = useState(() => new Date());
  const [selectedSportId, setSelectedSportId] = useState<SportId>("all");
  const [fixtures, setFixtures] = useState<Fixture[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  const loadFixtures = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchFixturesClient(selectedSportId);
      setFixtures(data.fixtures ?? []);
      setLastUpdated(data.updatedAt ?? null);
    } catch {
      setFixtures([]);
    } finally {
      setLoading(false);
    }
  }, [selectedSportId]);

  useEffect(() => {
    loadFixtures();
  }, [loadFixtures]);

  const goPrev = () => {
    const d = new Date(centerDate);
    d.setDate(d.getDate() - 1);
    setCenterDate(d);
  };

  const goNext = () => {
    const d = new Date(centerDate);
    d.setDate(d.getDate() + 1);
    setCenterDate(d);
  };

  const centerDateStr = [
    centerDate.getFullYear(),
    String(centerDate.getMonth() + 1).padStart(2, "0"),
    String(centerDate.getDate()).padStart(2, "0"),
  ].join("-");

  const todayFixtures = fixtures
    .filter((f) => f.date === centerDateStr)
    .sort((a, b) => a.kickoff.localeCompare(b.kickoff));

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <HeaderBar
        centerDate={centerDate}
        onPrev={goPrev}
        onNext={goNext}
        onRefresh={loadFixtures}
        loading={loading}
        lastUpdated={lastUpdated}
      />

      <SportSelector
        sports={SPORT_OPTIONS}
        selectedSportId={selectedSportId}
        onChange={(id) => setSelectedSportId(id as SportId)}
      />

      <main className="p-4">
        <div className="max-w-xl mx-auto">
          <h2 className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-4">
            {centerDate.toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </h2>
          <div className="space-y-3">
            {todayFixtures.map((fixture) => (
              <div key={fixture.id}>
                {fixture.sport === "f1" ? (
                  <F1Card fixture={fixture} />
                ) : (
                  <FootballCard fixture={fixture} />
                )}
              </div>
            ))}
            {todayFixtures.length === 0 && (
              <p className="text-slate-500 dark:text-slate-400 py-12 text-center">
                No matches on this date
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
