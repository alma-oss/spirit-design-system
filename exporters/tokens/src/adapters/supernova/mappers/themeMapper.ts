import type { TokenTheme as SupernovaTokenTheme } from '@supernovaio/sdk-exporters';
import { CollectionKind, type Device, type Theme } from '../../../core/types';
import { getThemeCollectionId } from '../../../helpers/collectionsHelper';

/** The value of the `Collection` property of a token, see `getCollectionId`. */
type CollectionId = string | boolean | number | undefined;

/**
 * Whether the theme overrides the tokens of the devices collection. Supernova has no flag for it, so the collection of
 * the tokens a theme overrides is compared with the one of the devices collection.
 *
 * @param theme
 * @param deviceCollectionId
 */
const isDeviceTheme = (theme: SupernovaTokenTheme, deviceCollectionId: CollectionId): boolean =>
  deviceCollectionId !== undefined && getThemeCollectionId(theme) === deviceCollectionId;

/**
 * @param theme
 * @param deviceCollectionId - Id of the devices collection option, `undefined` when there is none
 */
export const mapTheme = (theme: SupernovaTokenTheme, deviceCollectionId?: CollectionId): Theme => {
  const isDevice = isDeviceTheme(theme, deviceCollectionId);

  return {
    id: theme.id,
    name: theme.name,
    codeName: theme.codeName || undefined,
    collection: isDevice ? CollectionKind.Devices : CollectionKind.Color,
    // The code name of a device theme is the device, see `getDeviceThemes`.
    device: isDevice ? theme.codeName || undefined : undefined,
    brandId: theme.brandId || undefined,
  };
};

export const mapDevice = (theme: Theme): Device | null =>
  theme.collection === CollectionKind.Devices && theme.device ? { name: theme.device, themeId: theme.id } : null;
