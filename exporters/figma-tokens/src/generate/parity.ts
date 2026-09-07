import { DISCLAIMER, SUPERNOVA_DISCLAIMER } from './constants';

const normalizeProvenance = (content: string): string => content.replace(DISCLAIMER, SUPERNOVA_DISCLAIMER);

export const contentsMatchIgnoringProvenance = (generated: string, committed: string): boolean =>
  normalizeProvenance(generated) === committed || generated === committed;

export const allowedParityDifferences = ['Figma values may differ from a stale committed dump', 'Provenance comment (Figma vs Supernova)'];
