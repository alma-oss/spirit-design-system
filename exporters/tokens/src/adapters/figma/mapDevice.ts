import { CollectionKind, type Device, type Theme } from '../../core/types';

/**
 * The device a device theme stands for, `null` for any other theme.
 *
 * @param theme
 */
export const mapDevice = (theme: Theme): Device | null =>
  theme.collection === CollectionKind.Devices && theme.device ? { name: theme.device, themeId: theme.id } : null;
