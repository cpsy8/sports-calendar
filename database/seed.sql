-- Optional: Run this in Supabase SQL Editor to seed sample fixtures
-- Or use: supabase db push (for migrations) then run this seed

INSERT INTO fixtures (home_team, away_team, competition, competition_short, kickoff, date, venue, status, home_score, away_score) VALUES
('Arsenal', 'Liverpool', 'Premier League', 'EPL', '16:30', CURRENT_DATE, 'Emirates Stadium', 'scheduled', NULL, NULL),
('Manchester City', 'Chelsea', 'Premier League', 'EPL', '13:30', CURRENT_DATE, 'Etihad Stadium', 'scheduled', NULL, NULL),
('Real Madrid', 'Barcelona', 'La Liga', 'LaLiga', '20:00', CURRENT_DATE + 1, 'Santiago Bernabeu', 'scheduled', NULL, NULL),
('Bayern Munich', 'Borussia Dortmund', 'Bundesliga', 'Bundesliga', '18:30', CURRENT_DATE, 'Allianz Arena', 'live', 2, 1),
('Inter Milan', 'Juventus', 'Serie A', 'Serie A', '20:45', CURRENT_DATE + 2, 'San Siro', 'scheduled', NULL, NULL),
('Paris Saint-Germain', 'Marseille', 'Ligue 1', 'Ligue 1', '21:00', CURRENT_DATE + 1, 'Parc des Princes', 'scheduled', NULL, NULL),
('Manchester United', 'Tottenham', 'Premier League', 'EPL', '15:00', CURRENT_DATE - 1, 'Old Trafford', 'finished', 1, 2)
;
