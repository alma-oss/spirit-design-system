# Browser Support and Baseline

Report compatibility from current evidence. Do not infer Baseline from global usage
percentages, a Chrome release, or memory.

## Required Order

1. Determine the exact feature being used. A broad feature can be Baseline while a
   newer value, subfeature, or pseudo-class is still Limited Availability.
2. Query the official WebStatus feature record with
   [`../live-mdn-fetch.md`](../live-mdn-fetch.md).
3. Use MDN or the relevant specification to confirm syntax and partial behavior.
4. State the Baseline label, first supporting browser versions when useful, and the
   fallback or minimum target-browser requirement.
5. If the API has no record, call the status experimental or unknown and cite the
   browser release note or specification. Never manufacture a Baseline label.

## Official Categories

| WebStatus value  | Report as                 | Interpretation                                            |
| ---------------- | ------------------------- | --------------------------------------------------------- |
| `widely`         | 🟢 Widely Available       | Interoperable in the core browser set for 30+ months      |
| `newly`          | 🔵 Newly Available        | Interoperable in the core browser set for under 30 months |
| `limited`        | 🟡 Limited Availability   | Core-browser interoperability is incomplete               |
| no usable record | 🟣 Experimental / unknown | Verify release notes, flags, and specifications manually  |

Baseline is about interoperable availability in the core browser set. It is not a
market-share score. A feature can have high usage coverage and still be Limited
Availability, or be Newly Available with no percentage attached.

## Response Pattern

For a single feature, keep the support note compact:

```md
Baseline: 🟡 Limited Availability (live WebStatus check, 2026-08-10).
Chrome supports it from version 150; Firefox and Safari do not yet expose the same
capability. Keep the fallback declaration first and gate the enhancement.
```

For a composite example, report the least-interoperable subfeature that the solution
depends on, then distinguish the stable core:

```md
Core container queries are 🟢 Widely Available. The comma-separated query syntax in
this variant is newer and should be treated separately for target-browser decisions.
```

## Progressive Enhancement

Use a working default before an enhancement:

```css
.headline {
  font-size: clamp(2rem, 8vi, 5rem);
  text-wrap: balance;
}

@supports (text-fit: grow) {
  .headline {
    font-size: 1rem;
    text-fit: grow per-line-all;
  }
}
```

Do not add `@supports` mechanically. Use it when unsupported syntax would otherwise
remove necessary styling, when the fallback differs, or when several declarations
must activate as a unit.

## Target Browsers Override Generic Advice

When the repository has a browserslist, support matrix, analytics policy, or explicit
user target, evaluate the feature against that requirement. Baseline remains useful
context but does not replace the project's compatibility contract.

## Snapshot Maintenance

Run `python3 scripts/update_baseline.py --check` before publishing support claims.
Use `--write` to refresh mapped demo headers and index entries. Treat warnings as a
manual-review queue, especially for features first shipping in one browser.
