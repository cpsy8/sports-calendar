# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog 1.1.0](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning 2.0.0](https://semver.org/spec/v2.0.0.html).
While `0.x`, breaking changes bump MINOR (see `docs/RELEASES.md`).

## [Unreleased]

## [0.4.0] - 2026-05-04

### Added
- Standings tab (#18).
- Realtime data feeding from Supabase (#17).
- Data-freshness badge and manual refresh proxy in the header.

### Changed
- Header refresh control wired to the new freshness badge.

## [0.3.0] - 2026-04

### Added
- `TeamLogo` component backed by Supabase Storage (#16).

## [0.2.0] - 2026-03

### Added
- SportPulse UI redesign with Today tab and new layout (#15).
- Dark mode toggle with pre-paint script and `MutationObserver`-based sync (#14).

### Changed
- Date format normalization across cards.
- `.gitignore` updated for local artifacts.

### Fixed
- Date display formatting bug.

## [0.1.0] - 2026-02

### Added
- Initial daily fixtures view backed by Supabase in production and local Docker Postgres in dev.
- `Fixture` interface, `FootballCard`, `F1Card`, `SportSelector`, `HeaderBar` components.
- Static-export build targeting GitHub Pages.

[Unreleased]: https://github.com/cpsy8/sports-calendar/compare/v0.4.0...HEAD
[0.4.0]: https://github.com/cpsy8/sports-calendar/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/cpsy8/sports-calendar/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/cpsy8/sports-calendar/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/cpsy8/sports-calendar/releases/tag/v0.1.0
