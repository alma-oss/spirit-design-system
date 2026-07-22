// packages/web/src/js is compiled under its own package's tsconfig (see packages/web/tsconfig.json).
// Importing it directly here would pull its source into docsite's stricter `tsc` program and
// surface unrelated pre-existing type gaps that only appear under docsite's lib/target settings.
// This ambient declaration scopes the cross-package import to just what WebPreviewContent needs;
// Next's bundler still resolves the real file via the @workspace/web/* path alias at runtime.
declare module '@workspace/web/js/index.esm' {
  export const initSpiritComponents: (root?: Element) => void;
}
