import { type Token } from '@supernovaio/sdk-exporters';
import { CollectionKind } from '../../../core/types';
import { createCollectionKindResolver, getDeviceCollectionId } from '../collectionKind';

const properties = [
  {
    name: 'Collection',
    options: [
      { id: 'theme-tokens-id', name: 'Theme tokens' },
      { id: 'global-tokens-id', name: 'Global tokens' },
      { id: 'device-tokens-id', name: 'Device' },
      { id: 'primitives-id', name: 'Primitives' },
    ],
  },
];

const token = (id: string, collection?: string): Token =>
  ({ id, properties, propertyValues: collection ? { collection } : {} }) as unknown as Token;

describe('collectionKind', () => {
  describe('createCollectionKindResolver', () => {
    it('should map a token to the kind of its collection', () => {
      const global = token('global', 'global-tokens-id');
      const withoutCollection = token('without-collection');
      const color = token('color', 'theme-tokens-id');
      const device = token('device', 'device-tokens-id');

      const getCollectionKind = createCollectionKindResolver([global, withoutCollection, color, device]);

      expect(getCollectionKind(global)).toBe(CollectionKind.Global);
      expect(getCollectionKind(withoutCollection)).toBe(CollectionKind.Global);
      expect(getCollectionKind(color)).toBe(CollectionKind.Color);
      expect(getCollectionKind(device)).toBe(CollectionKind.Devices);
    });

    it('should map a token of any other collection to the lookup kind', () => {
      const primitive = token('primitive', 'primitives-id');

      expect(createCollectionKindResolver([token('global', 'global-tokens-id'), primitive])(primitive)).toBe(
        CollectionKind.Lookup,
      );
    });
  });

  describe('getDeviceCollectionId', () => {
    it('should return the id of the devices collection', () => {
      expect(getDeviceCollectionId([token('global', 'global-tokens-id'), token('device', 'device-tokens-id')])).toBe(
        'device-tokens-id',
      );
    });

    it('should return undefined when no token belongs to the devices collection', () => {
      expect(getDeviceCollectionId([token('global', 'global-tokens-id')])).toBeUndefined();
    });
  });
});
