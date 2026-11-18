# Mutation Testing

Unit tests tell you which code is _executed_ by tests. [Stryker][stryker] tells you whether the tests would actually
_notice_ a bug: it makes small changes ("mutants") to the source code and re-runs the tests. A mutant that makes a test
fail is **killed**; a mutant that no test notices **survived**, which points to a missing or weak assertion.

> Mutation testing is currently a **pilot** and covers only `packages/common`. The results are advisory and never
> block a pull request.

## Running Locally

```shell
cd packages/common
yarn test:mutation
```

The run prints a score table and the surviving mutants. A detailed HTML report is written to
`packages/common/reports/mutation/index.html`.

Runs are incremental: results for unchanged code and tests are reused from
`packages/common/reports/mutation/incremental.json`, so repeated runs are fast. Use `yarn test:mutation --force` (or delete the file) for a full run. Do this before trusting a score after changing
tests: incremental mode can keep stale results for mutants in top-level (static) code.

## Reading the Report

| Status        | Meaning                                                                    |
| ------------- | -------------------------------------------------------------------------- |
| Killed        | A test failed because of the mutant. Good.                                 |
| Survived      | All tests passed with the mutant in place. Add or strengthen an assertion. |
| No coverage   | No test executes the mutated code.                                         |
| Timeout       | The mutant caused an infinite loop. Counted as detected.                   |
| Compile error | The mutant is not valid TypeScript. Ignored by the score.                  |

Not every surviving mutant is a problem. Some are _equivalent mutants_ (the change does not alter behavior). Silence
those with a comment that explains why:

```ts
// Stryker disable next-line ConditionalExpression: equivalent, the fallback produces the same value
```

## Configuration

- `packages/common/stryker.config.mjs` – Stryker configuration for the package.
- `thresholds.break` is `null`, so the score never fails the run.
- `tempDirName` points to the repository root (`../../.stryker-tmp`) because the shared Jest preset resolves
  `@swc/jest` relative to `<rootDir>/../../node_modules`.
- Dependencies are managed in the `test` catalog in `.yarnrc.yml`.

## Continuous Integration

The [Mutation Testing workflow][workflow] runs on a weekly schedule, on demand, and on pull requests touching
`packages/common`. It uploads the HTML and JSON reports as artifacts and writes the score to the job summary.
It is not part of the main CI workflow.

[stryker]: https://stryker-mutator.io/
[workflow]: https://github.com/alma-oss/spirit-design-system/blob/main/.github/workflows/mutation.yaml
