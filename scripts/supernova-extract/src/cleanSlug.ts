/**
 * Supernova appends random id suffixes to URL path segments, e.g. `overview-dvtIAOKR`
 * or `component-button-At5Ihq6t-At5Ihq6t`.
 *
 * We only strip a trailing `-*` token if it "looks" like a generated id (avoids
 * eating real words like `spirit` in `what-is-spirit-PDPDSQC7`).
 */
const KNOWN_TAB_NAMES = new Set(['overview', 'design', 'accessibility', 'figma']);

function isSupernovaIdToken(token: string): boolean {
  if (token.length < 6 || token.length > 32) {
    return false;
  }

  if (!/^[A-Za-z0-9]+$/u.test(token)) {
    return false;
  }

  // All-lowercase short tokens are often real words, not random ids.
  if (token.length <= 12 && token === token.toLowerCase() && !/[0-9]/u.test(token)) {
    return false;
  }

  // Typical Supernova id: mixed case, digits, or a long alnum blob.
  return /[0-9]/u.test(token) || /[A-Z]/u.test(token) || token.length > 12;
}

export function cleanPathSegment(segment: string): string {
  let s = segment;

  for (;;) {
    const m = s.match(/-([A-Za-z0-9]+)$/u);

    if (!m?.[1]) {
      return stripKnownTabLowercaseIds(s);
    }

    if (!isSupernovaIdToken(m[1])) {
      return stripKnownTabLowercaseIds(s);
    }

    s = s.slice(0, -(m[0] as string).length);

    if (s.length === 0) {
      return segment;
    }
  }
}

function stripKnownTabLowercaseIds(segment: string): string {
  const parts = segment.split('-');
  const [first, ...rest] = parts;

  if (!first || !KNOWN_TAB_NAMES.has(first) || rest.length === 0) {
    return segment;
  }

  if (rest.every((part) => /^[a-z]{6,32}$/u.test(part))) {
    return first;
  }

  return segment;
}
