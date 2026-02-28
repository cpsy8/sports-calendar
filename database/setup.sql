-- Run this entire file in Supabase SQL Editor to create table + seed data
-- Dashboard: https://supabase.com/dashboard → your project → SQL Editor → New query

-- 1. Create fixtures table
CREATE TABLE IF NOT EXISTS fixtures (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  home_team TEXT NOT NULL,
  away_team TEXT NOT NULL,
  competition TEXT NOT NULL,
  competition_short TEXT NOT NULL,
  kickoff TEXT NOT NULL,
  date DATE NOT NULL,
  venue TEXT,
  status TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'live', 'finished')),
  home_score INTEGER,
  away_score INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_fixtures_date ON fixtures(date);
CREATE INDEX IF NOT EXISTS idx_fixtures_date_kickoff ON fixtures(date, kickoff);

ALTER TABLE fixtures ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read" ON fixtures;
CREATE POLICY "Allow public read" ON fixtures FOR SELECT USING (true);

-- 2. Clear existing seed data (optional - remove if you want to keep existing)
TRUNCATE fixtures RESTART IDENTITY;

-- 3. Seed dummy fixtures (2 weeks around today)
INSERT INTO fixtures (home_team, away_team, competition, competition_short, kickoff, date, venue, status, home_score, away_score) VALUES
('Arsenal', 'Liverpool', 'Premier League', 'EPL', '16:30', CURRENT_DATE, 'Emirates Stadium', 'scheduled', NULL, NULL),
('Manchester City', 'Chelsea', 'Premier League', 'EPL', '13:30', CURRENT_DATE, 'Etihad Stadium', 'scheduled', NULL, NULL),
('Real Madrid', 'Barcelona', 'La Liga', 'LaLiga', '20:00', CURRENT_DATE + 1, 'Santiago Bernabeu', 'scheduled', NULL, NULL),
('Bayern Munich', 'Borussia Dortmund', 'Bundesliga', 'Bundesliga', '18:30', CURRENT_DATE, 'Allianz Arena', 'live', 2, 1),
('Inter Milan', 'Juventus', 'Serie A', 'Serie A', '20:45', CURRENT_DATE + 2, 'San Siro', 'scheduled', NULL, NULL),
('Paris Saint-Germain', 'Marseille', 'Ligue 1', 'Ligue 1', '21:00', CURRENT_DATE + 1, 'Parc des Princes', 'scheduled', NULL, NULL),
('Manchester United', 'Tottenham', 'Premier League', 'EPL', '15:00', CURRENT_DATE - 1, 'Old Trafford', 'finished', 1, 2),
('Atletico Madrid', 'Sevilla', 'La Liga', 'LaLiga', '18:30', CURRENT_DATE + 2, 'Wanda Metropolitano', 'scheduled', NULL, NULL),
('AC Milan', 'Napoli', 'Serie A', 'Serie A', '20:45', CURRENT_DATE - 2, 'San Siro', 'finished', 2, 0),
('Ajax', 'PSV Eindhoven', 'Eredivisie', 'Eredivisie', '19:45', CURRENT_DATE + 1, 'Johan Cruyff Arena', 'scheduled', NULL, NULL),
('Arsenal', 'Chelsea', 'Premier League', 'EPL', '12:00', CURRENT_DATE + 3, 'Emirates Stadium', 'scheduled', NULL, NULL),
('Barcelona', 'Atletico Madrid', 'La Liga', 'LaLiga', '15:00', CURRENT_DATE + 3, 'Camp Nou', 'scheduled', NULL, NULL),
('Borussia Dortmund', 'RB Leipzig', 'Bundesliga', 'Bundesliga', '17:30', CURRENT_DATE - 1, 'Signal Iduna Park', 'finished', 3, 1),
('Juventus', 'AC Milan', 'Serie A', 'Serie A', '20:45', CURRENT_DATE + 1, 'Allianz Stadium', 'scheduled', NULL, NULL),
('Lyon', 'Monaco', 'Ligue 1', 'Ligue 1', '21:00', CURRENT_DATE + 2, 'Groupama Stadium', 'scheduled', NULL, NULL);
