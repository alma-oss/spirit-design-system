import { NamingHelper, StringCase } from '@supernovaio/export-helpers';

export const toPlural = (name: string): string => {
  const specialCases: Record<string, string> = {
    radius: 'radii',
    spacing: 'spaces',
  };

  return specialCases[name] || (name.endsWith('s') ? name : `${name}s`);
};

export const toCamelCase = (name: string): string => NamingHelper.codeSafeVariableName(name, StringCase.camelCase);

export const formatLayerSuffix = (layer: number): string => `-${layer.toString().padStart(2, '0')}`;
