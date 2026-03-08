"use client";

import { useState, useCallback, useEffect } from "react";
import type { Fixture } from "./lib/fixtures";
import { COMPETITION_COLORS, CARD_CLASSES } from "./lib/fixtures";
import { HeaderBar, type ViewMode } from "./components/HeaderBar";
import { SportSelector, type SportOption } from "./components/SportSelector";

type SportId = "all" | "football" | "f1";

const SPORT_OPTIONS: SportOption[] = [
  { id: "all", label: "All sports" },
  { id: "football", label: "Football" },
  { id: "f1", label: "F1" },
];

function getWeekStart(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Monday = 0
  d.setDate(diff);
  return d;
}

function getWeekDays(
  centerDate: Date,
): { date: Date; dateStr: string; label: string }[] {
  const start = getWeekStart(centerDate);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const dateStr = d.toISOString().split("T")[0];
    const dayName = d.toLocaleDateString("en-US", { weekday: "short" });
    const dayNum = d.getDate();
    return { date: d, dateStr, label: `${dayName} ${dayNum}` };
  });
}

const TIME_SLOTS = [
  "06:00",
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
];
const SLOT_HEIGHT = 56;

function getSlotIndex(kickoff: string): number {
  const [h, m] = kickoff.split(":").map(Number);
  const totalMinutes = h * 60 + m;
  const startMinutes = 6 * 60;
  return Math.floor((totalMinutes - startMinutes) / 60);
}

function getOffsetInSlot(kickoff: string): number {
  const [, m] = kickoff.split(":").map(Number);
  return (m / 60) * SLOT_HEIGHT;
}

function MatchCard({
  fixture,
  colorKey,
}: {
  fixture: Fixture;
  colorKey: string;
}) {
  const cardClass = CARD_CLASSES[colorKey] || CARD_CLASSES.teal;

  return (
    <div
      className={`absolute left-0.5 right-0.5 rounded-lg border shadow-sm p-2 ${cardClass}`}
      style={{ top: 2 }}
    >
      <p className="text-[10px] font-medium opacity-85 truncate">
        {fixture.competitionShort}
      </p>
      <p className="text-xs font-semibold truncate mt-0.5">
        {fixture.homeTeam} vs {fixture.awayTeam}
      </p>
      <p className="text-[10px] opacity-80 mt-1">
        {fixture.status === "scheduled" ? (
          fixture.kickoff
        ) : fixture.status === "live" ? (
          <span className="text-red-600 dark:text-red-400 font-semibold">
            LIVE {fixture.homeScore}–{fixture.awayScore}
          </span>
        ) : (
          <span className="line-through">
            {fixture.homeScore}–{fixture.awayScore} FT
          </span>
        )}
      </p>
    </div>
  );
}

export default function Home() {
  const [centerDate, setCenterDate] = useState(() => new Date());
  const [viewMode, setViewMode] = useState<ViewMode>("daily");
  const [selectedSportId, setSelectedSportId] = useState<SportId>("all");
  const [fixtures, setFixtures] = useState<Fixture[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  const loadFixtures = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/fixtures?sport=${selectedSportId}`);
      const data = await res.json();
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

  const weekDays = getWeekDays(centerDate);

  const goPrev = () => {
    const d = new Date(centerDate);
    if (viewMode === "weekly") d.setDate(d.getDate() - 7);
    else d.setDate(d.getDate() - 1);
    setCenterDate(d);
  };

  const goNext = () => {
    const d = new Date(centerDate);
    if (viewMode === "weekly") d.setDate(d.getDate() + 7);
    else d.setDate(d.getDate() + 1);
    setCenterDate(d);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <HeaderBar
        centerDate={centerDate}
        viewMode={viewMode}
        onPrev={goPrev}
        onNext={goNext}
        onViewModeChange={setViewMode}
        onRefresh={loadFixtures}
        loading={loading}
        lastUpdated={lastUpdated}
      />

      <SportSelector
        sports={SPORT_OPTIONS}
        selectedSportId={selectedSportId}
        onChange={(id) => setSelectedSportId(id as SportId)}
      />

      <main className="p-4 overflow-x-auto">
        {viewMode === "weekly" ? (
          <div className="min-w-[600px]">
            {/* Week day headers */}
            <div className="flex border-b border-slate-200 dark:border-slate-800 mb-2">
              <div className="w-14 shrink-0 py-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                GMT+05:30
              </div>
              <div className="flex-1 flex">
                {weekDays.map((day) => (
                  <div
                    key={day.dateStr}
                    className="flex-1 min-w-[100px] py-2 px-1 text-center"
                  >
                    <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      {day.label}
                    </p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">
                      {day.date.toLocaleDateString("en-US", { month: "short" })}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Time grid */}
            <div className="relative">
              {TIME_SLOTS.map((slot, idx) => (
                <div
                  key={slot}
                  className="flex border-b border-slate-100 dark:border-slate-800/50"
                  style={{ minHeight: SLOT_HEIGHT }}
                >
                  <div className="w-14 shrink-0 py-1 text-[10px] font-medium text-slate-400 dark:text-slate-500">
                    {new Date(`2000-01-01T${slot}`).toLocaleTimeString(
                      "en-US",
                      {
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      },
                    )}
                  </div>
                  <div className="flex-1 flex relative">
                    {weekDays.map((day) => (
                      <div
                        key={day.dateStr}
                        className="flex-1 min-w-[100px] border-l border-slate-100 dark:border-slate-800/50 relative"
                      >
                        {/* Match cards for this day+slot */}
                        {fixtures
                          .filter(
                            (f) =>
                              f.date === day.dateStr &&
                              getSlotIndex(f.kickoff) === idx,
                          )
                          .map((fixture) => (
                            <div
                              key={fixture.id}
                              className="absolute w-full overflow-hidden"
                              style={{
                                top: getOffsetInSlot(fixture.kickoff),
                                height: SLOT_HEIGHT - 4,
                              }}
                            >
                              <MatchCard
                                fixture={fixture}
                                colorKey={
                                  COMPETITION_COLORS[fixture.competition] ??
                                  "teal"
                                }
                              />
                            </div>
                          ))}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : viewMode === "daily" ? (
          <div className="max-w-xl mx-auto">
            <h2 className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-4">
              {centerDate.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </h2>
            <div className="space-y-3">
              {fixtures
                .filter(
                  (f) => f.date === centerDate.toISOString().split("T")[0],
                )
                .sort((a, b) => a.kickoff.localeCompare(b.kickoff))
                .map((fixture) => (
                  <div
                    key={fixture.id}
                    className={`rounded-xl border p-4 shadow-sm ${
                      CARD_CLASSES[
                        COMPETITION_COLORS[fixture.competitionShort] ?? COMPETITION_COLORS[fixture.competition] ?? "teal"
                      ]
                    }`}
                  >
                    <p className="text-xs font-medium opacity-85">
                      {fixture.competition}
                    </p>
                    <div className="flex items-center justify-between gap-4 mt-2">
                      <p className="font-semibold flex-1 text-right">
                        {fixture.homeTeam}
                      </p>
                      <div className="shrink-0 text-center">
                        {fixture.status === "scheduled" ? (
                          <span className="text-sm">{fixture.kickoff}</span>
                        ) : (
                          <span className="text-lg font-bold">
                            {fixture.homeScore} – {fixture.awayScore}
                          </span>
                        )}
                        {fixture.status === "live" && (
                          <span className="block text-[10px] text-red-600 font-semibold">
                            LIVE
                          </span>
                        )}
                      </div>
                      <p className="font-semibold flex-1 text-left">
                        {fixture.awayTeam}
                      </p>
                    </div>
                    {fixture.venue && (
                      <p className="text-xs opacity-75 mt-2">{fixture.venue}</p>
                    )}
                  </div>
                ))}
              {fixtures.filter(
                (f) => f.date === centerDate.toISOString().split("T")[0],
              ).length === 0 && (
                <p className="text-slate-500 dark:text-slate-400 py-12 text-center">
                  No matches on this date
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <p className="text-slate-500 dark:text-slate-400 py-12 text-center">
              Monthly view – coming soon. Use Weekly for the full calendar.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
