/**
 * Supernova appends random id suffixes to URL path segments, e.g. `overview-dvtIAOKR`
 * or `component-button-At5Ihq6t-At5Ihq6t`.
 *
 * We only strip a trailing `-*` token if it "looks" like a generated id (avoids
 * eating real words like `spirit` in `what-is-spirit-PDPDSQC7`).
 */
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
      return s;
    }

    if (!isSupernovaIdToken(m[1])) {
      return s;
    }

    s = s.slice(0, -(m[0] as string).length);

    if (s.length === 0) {
      return segment;
    }
  }
}
