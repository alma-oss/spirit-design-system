import type { TokenTheme as SupernovaTokenTheme } from '@supernovaio/sdk-exporters';
import type { Theme } from '../../../core/types';

export const mapTheme = (theme: SupernovaTokenTheme): Theme => ({
  id: theme.id,
  name: theme.name,
});
