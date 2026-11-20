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
  // TODO: The font replacements (`searchFont1..5`, `replaceFont1..5`) are only supplied by Supernova, the replacement
  // itself is done by the pipeline and nothing is replaced while they are empty. A source without such settings
  // (Figma) will most likely read them from a Spirit config file in the repository the tokens are downloaded into,
  // the way the assets exporter loads its config (`exporters/assets/src/config`).
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
