/**
 * Reads a Figma Config file with the Figma adapter and writes the generated files to `.build-figma/`, the way the
 * Supernova run fills `.build/`. Not a part of the exporter bundle.
 *
 * Font family replacement is not applied: it still comes from the Supernova pipeline fields
 * (`searchFont1..5` / `replaceFont1..5`), see DS-2877.
 *
 * Usage (the token needs `file_content:read`, `file_variables:read` and `library_content:read`, and is read from the
 * shell or from `exporters/tokens/.env`):
 *
 *   yarn workspace @alma-oss/spirit-tokens-exporter figma:export <fileKey> [brandId]
 */
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FigmaAdapter } from '../adapters/figma';
import { generateOutputFilesByThemes } from '../generators/fileGenerator';

// Next to the exporter's `.build/`, whatever directory the script is run from
const OUTPUT_DIRECTORY = fileURLToPath(new URL('../../.build-figma', import.meta.url));

const main = async (): Promise<void> => {
  const [fileKey, brandId] = process.argv.slice(2);
  const token = process.env.FIGMA_ACCESS_TOKEN;

  if (!token || !fileKey) {
    throw new Error('Usage: FIGMA_ACCESS_TOKEN=... figma:export <fileKey> [brandId]');
  }

  const warnings: string[] = [];
  const collection = await new FigmaAdapter({ token, onWarning: (message) => warnings.push(message) }).fetchTokens({
    source: { fileKey, brandId },
  });
  const files = generateOutputFilesByThemes(collection);

  rmSync(OUTPUT_DIRECTORY, { recursive: true, force: true });
  files.forEach(({ path, fileName, content }) => {
    const target = join(OUTPUT_DIRECTORY, path, fileName);

    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, content);
  });

  /* eslint-disable no-console */
  console.log(
    `${files.length} files in ${OUTPUT_DIRECTORY}: ${collection.tokens.length} tokens, ` +
      `${collection.themedTokens.length} themes, ${collection.devices.length} devices.`,
  );
  warnings.forEach((warning) => console.warn(`warning: ${warning}`));
  /* eslint-enable no-console */
};

main().catch((error: unknown) => {
  // eslint-disable-next-line no-console
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
