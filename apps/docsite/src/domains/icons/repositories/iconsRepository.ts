import { readdirSync } from 'fs';
import { resolve } from 'path';

const SVG_EXTENSION = '.svg';

export const fetchAllIcons = (): string[] =>
  readdirSync(resolve(process.cwd(), '../../packages/icons/src/svg'))
    .filter((file) => file.endsWith(SVG_EXTENSION))
    .map((file) => file.slice(0, -SVG_EXTENSION.length))
    .sort();
