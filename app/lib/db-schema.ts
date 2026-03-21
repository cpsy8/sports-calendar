import { boolean, pgTable, text, uuid, integer, date, timestamp } from "drizzle-orm/pg-core";

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

export const sportImages = pgTable("sport_images", {
  id: uuid("id").primaryKey().defaultRandom(),
  category: text("category").notNull(),
  sport: text("sport").notNull(),
  entityCode: text("entity_code").notNull(),
  leagueCode: text("league_code"),
  storagePath: text("storage_path").notNull(),
  altText: text("alt_text"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const siteContent = pgTable("site_content", {
  id: uuid("id").primaryKey().defaultRandom(),
  slot: text("slot").notNull().unique(),
  title: text("title"),
  subtitle: text("subtitle"),
  imagePath: text("image_path"),
  badgeText: text("badge_text"),
  accentColor: text("accent_color"),
  isActive: boolean("is_active").default(true),
  validFrom: timestamp("valid_from", { withTimezone: true }),
  validUntil: timestamp("valid_until", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

