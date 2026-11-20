import { AnyOutputFile, PulsarContext, Supernova } from '@supernovaio/sdk-exporters';
import { SupernovaAdapter } from './adapters/supernova/SupernovaAdapter';
import { exportConfiguration } from '../config';
import { generateOutputFilesByThemes } from './generators/fileGenerator';
import { safeStringify } from './helpers/safeStringify';
import { transformToMap } from './transformers/tokensTransformer';
import { textFileWriter } from './writers/fileWriter';

// https://github.com/Supernova-Studio/exporters/issues/4
// @ts-ignore-next-line
Pulsar.export(async (sdk: Supernova, context: PulsarContext): Promise<Array<AnyOutputFile>> => {
  const { dsId, versionId, brandId } = context;

  // Fetch the necessary data, filtered by brand if specified by the VSCode extension or pipeline configuration.
  // The SDK is used by the adapter only, the generators get the resolved tokens.
  const { tokens, tokenGroups, resolved } = await new SupernovaAdapter(sdk).fetchResolvedTokens({
    source: { designSystemId: dsId, versionId },
    filters: { brandId: brandId ?? undefined },
  });

  // Convert all color tokens to CSS variables
  const mappedTokens = transformToMap(tokens);

  const outputFiles = generateOutputFilesByThemes(mappedTokens, tokenGroups, resolved);

  // Export the original data only if 'generateOriginalDataFiles' is set to true in config.local.json
  if (exportConfiguration.generateOriginalDataFiles) {
    outputFiles.push({
      path: './original-data/',
      fileName: '_original-tokens.json',
      content: safeStringify(tokens),
    });
    outputFiles.push({
      path: './original-data/',
      fileName: '_original-groups.json',
      content: JSON.stringify(tokenGroups, null, 2),
    });
  }

  // Write all output files
  return textFileWriter(outputFiles);
});
