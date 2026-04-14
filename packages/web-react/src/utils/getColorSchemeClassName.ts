import { Intensity } from '../constants';
import { createScopedColorTokenName } from './colorTokens';

interface GetColorSchemeClassNameOptions {
  color: string;
  isSubtle?: boolean;
}

export const getColorSchemeClassName = ({ color, isSubtle = false }: GetColorSchemeClassNameOptions): string => {
  const intensity = isSubtle ? Intensity.SUBTLE : Intensity.BASIC;

  return `color-scheme-on-${createScopedColorTokenName({
    color,
    intensity,
  })}`;
};
