import { parse as parseYaml } from 'yaml';

export interface CanonicalFrontmatter {
  title: string;
}

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;

export const parseCanonicalFrontmatter = (raw: string): { data: CanonicalFrontmatter; body: string } => {
  const match = raw.match(FRONTMATTER);

  if (!match?.[1]) {
    return { data: { title: '' }, body: raw };
  }

  const parsed = parseYaml(match[1]) as { title?: unknown };

  return {
    data: { title: typeof parsed?.title === 'string' ? parsed.title : '' },
    body: match[2] ?? '',
  };
};
