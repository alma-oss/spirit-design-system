/**
 * Split the release notes into the Canvas title (first `# ` heading) and the Canvas body.
 * Lines containing only `&nbsp;` are Slack paste helpers and are turned into empty lines.
 */
export function buildCanvas(markdown: string, fallbackTitle: string): { title: string; body: string } {
  const lines = markdown.split('\n');
  const titleIndex = lines.findIndex((line) => line.startsWith('# '));
  const title = titleIndex === -1 ? fallbackTitle : lines[titleIndex].slice(2).trim();
  const body = lines
    .filter((_, index) => index !== titleIndex)
    .map((line) => (line.trim() === '&nbsp;' ? '' : line))
    .join('\n')
    .trim();

  return { title, body };
}
