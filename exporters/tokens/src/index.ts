import { AnyOutputFile, PulsarContext, Supernova } from '@supernovaio/sdk-exporters';
import { SupernovaAdapter } from './adapters/supernova/SupernovaAdapter';
import { type ExporterConfiguration } from '../config';
import { generateOutputFilesByThemes } from './generators/fileGenerator';
import { safeStringify } from './helpers/safeStringify';
import { getReplacements } from './helpers/stringHelper';
import { textFileWriter } from './adapters/supernova/fileWriter';

// https://github.com/Supernova-Studio/exporters/issues/4
// @ts-ignore-next-line
Pulsar.export(async (sdk: Supernova, context: PulsarContext): Promise<Array<AnyOutputFile>> => {
  const { dsId, versionId, brandId } = context;

  // The settings of the Supernova pipeline (see `config.json`), read here only: the pipeline gets what it needs.
  // Font replacements (`searchFont1..5`, `replaceFont1..5`) are only supplied by Pulsar today. A Figma entry without
  // Pulsar will need another source for them when Pulsar is removed.
  const configuration = Pulsar.exportConfig<ExporterConfiguration>();

  // Fetch the tokens in the internal model, filtered by brand if specified by the VSCode extension or pipeline
  // configuration. The SDK is used by the adapter only, everything after it works with the model.
  const collection = await new SupernovaAdapter(sdk).fetchTokens({
    source: { designSystemId: dsId, versionId },
    filters: { brandId: brandId ?? undefined },
  });

  const outputFiles = generateOutputFilesByThemes(collection, {
    fontReplacements: getReplacements(configuration, 'Font'),
  });

  // Export the original data only if 'generateOriginalDataFiles' is set to true in config.local.json
  if (configuration.generateOriginalDataFiles) {
    outputFiles.push({
      path: './original-data/',
      fileName: '_original-tokens.json',
      content: safeStringify(collection.tokens),
    });
    outputFiles.push({
      path: './original-data/',
      fileName: '_original-groups.json',
      content: JSON.stringify(collection.groups, null, 2),
    });
  }

  // Write all output files
  return textFileWriter(outputFiles);
});
