# Release Tracking & Changelog Policy

Applies to **`sports-calendar`** (Next.js 16 frontend, static-exported to GitHub Pages). Companion repo: `my-public-database` (Python data pipeline) — see cross-repo coordination below.

## 1. Versioning Policy

This repo follows [Semantic Versioning 2.0.0](https://semver.org/) (`MAJOR.MINOR.PATCH`).

- **MAJOR** — breaking changes:
  - Removed/renamed public components exported under `app/components/*`
  - Breaking changes to the `Fixture` interface in `app/lib/fixtures.ts`
  - Drop of a supported sport, environment variable, or build target
  - Required Supabase schema columns removed
- **MINOR** — backward-compatible features:
  - New UI section/tab (e.g. Standings tab, Today tab)
  - New sport card component (`F1Card`, future `CricketCard`)
  - New optional env var, new column read from existing tables
- **PATCH** — bug fixes, doc-only edits, dependency bumps without behavior change, CSS-only tweaks.

### 0.x phase rules

The repo is currently pre-1.0 (`0.x.y`). Until `1.0.0`:

- Breaking changes bump **MINOR** (`0.4.0` → `0.5.0`), not MAJOR.
- Bug fixes and small additive changes bump **PATCH** (`0.4.0` → `0.4.1`).
- `1.0.0` is cut when the daily-view UI, Supabase wiring, dark mode, sport selector, and at least two sports are stable and we commit to API stability.

## 2. CHANGELOG Format

Follows [Keep a Changelog 1.1.0](https://keepachangelog.com/en/1.1.0/). One `CHANGELOG.md` lives at repo root.

Section ordering inside each release:

1. `Added` — new features
2. `Changed` — changes in existing functionality
3. `Deprecated` — soon-to-be-removed features
4. `Removed` — now-removed features
5. `Fixed` — bug fixes
6. `Security` — vulnerability fixes

`## [Unreleased]` always sits at the top. Each released version has a date `YYYY-MM-DD` and links to a GitHub compare URL at the bottom of the file.

```markdown
## [Unreleased]

## [0.4.0] - 2026-05-04
### Added
- Standings tab.

[Unreleased]: https://github.com/cpsy8/sports-calendar/compare/v0.4.0...HEAD
[0.4.0]: https://github.com/cpsy8/sports-calendar/compare/v0.3.0...v0.4.0
```

## 3. Tooling — Comparison and Recommendation

| Tool | Model | Pros | Cons |
|---|---|---|---|
| **release-please** | Auto PR from conventional commits | Auto changelog, tag, GH Release; zero per-PR overhead; monorepo-friendly | Requires conventional commits discipline |
| **changesets** | Manual `.changeset/*.md` per PR | Explicit author intent; great for libs/multi-package | Extra file per PR; overkill for an app |
| **semantic-release** | Fully automated tag/publish on every merge | Zero-touch releases | Opinionated, heavy; npm-publish oriented |
| **Manual CHANGELOG.md** | Hand-edited | Zero tooling | Easy to forget; no automation |

**Recommendation: `release-please`** via GitHub Action. It opens a single rolling "release PR" that accumulates entries from conventional commits since the last tag; merging that PR cuts the tag and creates a GitHub Release with notes.

### `.github/workflows/release-please.yml`

```yaml
name: release-please

on:
  push:
    branches: [main]

permissions:
  contents: write
  pull-requests: write

jobs:
  release-please:
    runs-on: ubuntu-latest
    steps:
      - uses: googleapis/release-please-action@v4
        with:
          release-type: node
          package-name: sports-calendar
          changelog-types: |
            [
              {"type":"feat","section":"Added"},
              {"type":"fix","section":"Fixed"},
              {"type":"perf","section":"Changed"},
              {"type":"refactor","section":"Changed"},
              {"type":"docs","section":"Changed","hidden":false},
              {"type":"chore","section":"Changed","hidden":true}
            ]
```

`release-type: node` aligns with `package.json`. Manifest mode (`release-please-config.json` + `.release-please-manifest.json`) is optional but recommended once the cadence stabilizes.

## 4. Branch & Commit Conventions

Branch names follow the existing scheme:

| Branch prefix | Bump | Commit prefix |
|---|---|---|
| `feat/<feature>` | MINOR | `feat:` |
| `fix/<issue>` | PATCH | `fix:` |
| `switch/<from>-to-<to>` | PATCH (MINOR if behavior changes) | `refactor:` or `chore:` |
| `docs/<topic>` | PATCH | `docs:` |
| `chore/<task>` | none/PATCH | `chore:` |
| `ci/<change>` | none | `ci:` |
| `test/<area>` | none | `test:` |

Conventional commit shape:

```
<type>(<scope>)<!>: <subject>

<body>

BREAKING CHANGE: <description>   # optional, forces MAJOR (or MINOR pre-1.0)
```

Examples:

```
feat(ui): add Standings tab
fix(supabase): handle null kickoff timestamps
refactor(layout): switch CardGrid from flex to grid
docs: document dark mode architecture
```

Squash-merge PRs and use the conventional-commit subject as the squash message — that subject is what release-please parses.

## 5. Initial CHANGELOG.md Seed

Seeded from the last 15 commits on `main`. See `/CHANGELOG.md` at repo root for the full file. Versions are inferred:

- **0.4.0** — standings tab, realtime data, freshness badge (MINOR features)
- **0.3.0** — TeamLogo + Supabase Storage (MINOR)
- **0.2.0** — SportPulse UI redesign with Today tab, dark mode (MINOR)
- **0.1.0** — initial daily fixtures view

## 6. Release Process

### Standard flow (release-please)

1. Open a branch following section 4.
2. Make commits with conventional prefixes.
3. Open PR → review → squash-merge to `main`.
4. The `release-please` action opens (or updates) a release PR titled `chore(main): release X.Y.Z` with the rendered `CHANGELOG.md` diff.
5. Merge that release PR. release-please tags `vX.Y.Z`, pushes the tag, and creates the GitHub Release.
6. The GitHub Pages deploy workflow runs against the new tag.

### Manual fallback

```bash
# pick the next version per section 1
git tag v0.4.1
git push --tags
gh release create v0.4.1 --generate-notes
```

Edit `CHANGELOG.md` by hand when bypassing release-please — keep `Unreleased` clean.

## 7. Cross-Repo Coordination

`sports-calendar` reads from Supabase tables defined and populated by `my-public-database`. When a UI feature requires a new column or table:

1. Land the schema change in `my-public-database` first; cut its release (e.g. `v0.3.0`).
2. In the `sports-calendar` PR that consumes it, add a line to the CHANGELOG entry:

   ```markdown
   ### Added
   - Standings tab. **Requires `my-public-database` >= 0.3.0.**
   ```

3. Reference the dependency repo's release URL in the PR description.
4. If the schema change is breaking on the producer side, both repos bump MINOR (pre-1.0) the same day.

## 8. Hotfix Flow

For a production-blocking bug on the latest tag:

1. Branch from `main` as `fix/<short-desc>`.
2. Single commit: `fix: <subject>`.
3. PR → squash-merge → let release-please cut a PATCH (`v0.4.0` → `v0.4.1`).
4. If release-please is unavailable, use the manual fallback in section 6 — no release PR needed for trivial PATCHes.

Hotfixes never carry `feat:` commits. If you need a feature, ship it on the next MINOR.
