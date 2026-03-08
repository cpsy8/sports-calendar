import { pgTable, text, uuid, integer, date, timestamp } from "drizzle-orm/pg-core";

export const footballFixtures = pgTable("football_fixtures", {
  id: uuid("id").primaryKey().defaultRandom(),
  homeTeam: text("home_team").notNull(),
  awayTeam: text("away_team").notNull(),
  competition: text("competition").notNull(),
  competitionShort: text("competition_short").notNull(),
  kickoff: text("kickoff").notNull(),
  date: date("date").notNull(),
  venue: text("venue"),
  status: text("status").notNull(),
  homeScore: integer("home_score"),
  awayScore: integer("away_score"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const f1Fixtures = pgTable("f1_fixtures", {
  id: uuid("id").primaryKey().defaultRandom(),
  round: integer("round").notNull(),
  circuit: text("circuit").notNull(),
  country: text("country").notNull(),
  date: date("date").notNull(),
  status: text("status").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

