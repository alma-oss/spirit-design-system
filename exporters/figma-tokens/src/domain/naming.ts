const SPECIAL_PLURALS: Record<string, string> = {
  radius: 'radii',
  spacing: 'spaces',
};

const SPECIAL_SINGULARS: Record<string, string> = {
  spacing: 'space',
  radii: 'radius',
  borders: 'border',
  shadows: 'shadow',
  gradients: 'gradient',
};

export const toParamCase = (value: string): string =>
  value
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();

export const toCamelCase = (value: string): string => {
  const param = toParamCase(value);
  const camel = param.replace(/-([a-z0-9])/g, (_, char: string) => char.toUpperCase());

  return /^\d/.test(camel) ? `_${camel}` : camel;
};

export const toPlural = (name: string): string => SPECIAL_PLURALS[name] || (name.endsWith('s') ? name : `${name}s`);

export const singularGroup = (group: string): string => {
  const lower = toParamCase(group);

  return SPECIAL_SINGULARS[lower] ?? lower;
};

export const splitPath = (name: string): string[] => name.split('/').map((part) => part.trim()).filter(Boolean);

const INVARIANT_ALIASES: Record<string, string> = {
  'radius-full': 'full',
};

export const handleInvariantTokenAlias = (tokenName: string): string => INVARIANT_ALIASES[tokenName] ?? tokenName;

export const tokenVariableName = (path: string[], hasParentPrefix: boolean, device?: string): string => {
  const parts = path.length > 0 ? path : ['token'];
  let name: string;

  if (hasParentPrefix) {
    name = toParamCase(parts.join('-'));
  } else {
    const last = parts.at(-1) ?? '';
    const group = singularGroup(parts[0] ?? '');
    const lastParam = toParamCase(last);

    if (/^\d+$/.test(last) || lastParam === 'full') {
      name = group ? `${group}-${lastParam}` : lastParam;
    } else if (!group || lastParam.startsWith(`${group}-`) || lastParam === group) {
      name = lastParam;
    } else {
      name = `${group}-${lastParam}`;
    }
  }

  if (device && !name.endsWith(`-${device}`)) {
    name = `${name}-${device}`;
  }

  return name;
};

export const getTokenAlias = (path: string[], kind: string, hasJsOutput: boolean, variableName: string): string => {
  const leaf = toParamCase(path.at(-1) ?? variableName);
  const invariantName = handleInvariantTokenAlias(toParamCase(variableName));
  let alias: string;

  if (invariantName !== toParamCase(variableName)) {
    alias = invariantName;
  } else {
    const numericPart = leaf.match(/\d+/)?.[0];

    if (kind !== 'color' && numericPart) {
      alias = numericPart;
    } else {
      alias = leaf;
    }
  }

  return hasJsOutput && !/^\d+$/.test(alias) ? toCamelCase(alias) : alias;
};
