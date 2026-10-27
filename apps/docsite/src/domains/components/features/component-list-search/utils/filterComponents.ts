// Case, spaces, underscores, and other punctuation are ignored, so "empty state" finds `EmptyState`.
const normalize = (text: string) => text.toLowerCase().replace(/[^a-z0-9]/g, '');

export const filterComponents = <T extends { name: string }>(components: T[], query: string): T[] => {
  const normalizedQuery = normalize(query);

  if (!normalizedQuery) {
    return components;
  }

  return components.filter(({ name }) => normalize(name).includes(normalizedQuery));
};
