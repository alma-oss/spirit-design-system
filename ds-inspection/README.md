# Design System Inspection — 2026-11-03

This folder holds the output of a design system multi-point inspection of Spirit, run with the `ds-inspection` Claude Code skill.
It is shared as a **draft pull request for reading and discussion. It is not meant to be merged.**

## What Is in Here

| File                                                                           | What it is                                                                                       |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| [`reports/2026-11-03-inspection.md`](reports/2026-11-03-inspection.md)         | The report: short version, inspection sheet (69/100), evidence basis, and the 10 station records |
| [`work-orders/2026-11-03-work-order.md`](work-orders/2026-11-03-work-order.md) | The prioritized fix list built from the report                                                   |
| [`GARAGE.md`](GARAGE.md)                                                       | The system profile and the evidence access map the run started from                              |

Start with "The short version" in the report, then skim the work order.

## How to Read the Results

- Each of the 10 stations scores 0–10: red 0–3, yellow 4–7, green 8–10. The total is a conversation starter, not a grade.
- Every finding is tagged `[verified]` (the technician read the file or tool output directly) or `[reported]` (not confirmed).
- Claims are scoped to what was inspected. Each station record lists what was **not** inspected.
- The Supernova → docsite documentation migration was treated as a known deviation, not a defect.

## How to Reproduce the Run

The skill itself is not part of this PR. Install the `ds-inspection` skill in your Claude Code setup (`~/.claude/skills/ds-inspection`), then:

1. Check out `main` and open Claude Code in the repository root.
2. Connect the evidence sources. Without them the run still works, but the affected findings become `[reported]`:
   - **Figma MCP** (native): authenticated, with access to the Spirit UI Kit file.
   - **Figma Console MCP** (optional, for whole-file sweeps): open the Spirit UI Kit in Figma Desktop and run the Desktop Bridge plugin (Plugins → Development → Figma Desktop Bridge). Check it with `figma_get_status` and `probe: true`.
   - **Jira MCP**: needed for Stations 7 and 8 (backlog health and feedback flow).
   - **Slack MCP** (optional): used to read the support channel read-only.
3. Run `/ds-inspection` and choose a full inspection.
   - If `ds-inspection/GARAGE.md` exists, confirm it is still current.
   - The skill announces the plan for the 10 stations; narrow the scope if you want.
4. The report and the work order are written to `ds-inspection/reports/` and `ds-inspection/work-orders/` with the current date.
5. To compare with this baseline later, run a re-inspection (`/ds-inspection`, mode: re-inspection). The delta against this report matters more than the absolute score.

### Notes From This Run

- The 10 stations were run in five parallel read-only groups (1 and 4, 2 and 3, 5 and 6, 7 and 8, 9 and 10), then assembled into the report.
- Figma Console findings reflect the file as open on the machine, including unpublished changes.
- The generation test (Stations 9 and 10), the three-way token diff (Station 6) and the test suites were **not** run, so no station is a confirmed green.
- Numbers such as Jira counts and contrast ratios were spot-checked before publishing. Re-run them rather than trusting this snapshot, because they change daily.
