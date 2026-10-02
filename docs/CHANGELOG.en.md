# Historical release notes

[Current changelog](../CHANGELOG.md) · [Overview](../README.en.md)

These English notes preserve the earlier translations. The main changelog contains the consolidated version history.

## 0.3.5 (2026-09-28)

Rejects unknown scan arguments and empty targets before scanning or replacing state, preventing misspelled scopes from expanding to the whole workspace. Fixes standard-mode output incorrectly displaying zero files and a failed verdict: counts, verdicts and findings now come from the actual scan result.

Validation host: Harness `0.2.0-rc.1` built from official sources (commit `407e65c8`) with Node `24.16.0` on 2026-09-28. All 31 plugin tests pass in an isolated environment; all 18 plugins mount together in one host registering 10 tools, with tool schemas and health-check contracts passing. No live ports or external services were exercised in this round.
