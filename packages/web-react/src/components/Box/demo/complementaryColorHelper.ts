export const collectDefinedColorValues = <T extends string>(...colorObjects: Record<string, T | undefined>[]): T[] =>
  colorObjects.flatMap(Object.values).filter((value): value is T => typeof value === 'string');

export const getComplementaryColor = ({ sourceColor, fallback }: { sourceColor: string; fallback: string }): string => {
  const suffixes = ['basic', 'subtle'] as const;

  const matchSuffix = suffixes.find((suffix) => sourceColor.endsWith(suffix));
  if (!matchSuffix) {
    return fallback;
  }

  const oppositeSuffix = suffixes.find((s) => s !== matchSuffix)!;

  return sourceColor.replace(matchSuffix, oppositeSuffix);
};
