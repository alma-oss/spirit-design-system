import { fs } from 'zx';
import { errorMessage, getOutputPath, infoMessage, timestamp } from './helpers';
import { runner } from './runner';
import { RunnerConfig, ScannerType } from './types';

interface BaseArgs {
  outputPath: string;
  config: RunnerConfig;
  folder?: string;
}

interface Args extends BaseArgs {
  source: string;
  type: ScannerType;
}

export const getRunnerCall = async ({ outputPath, config, source, type }: Args) => {
  const result = await runner(config, source, type);

  if (outputPath) {
    fs.writeFile(getOutputPath(outputPath, timestamp()), JSON.stringify(result, null, 2), 'utf8').then(() => {
      infoMessage(`Successfully created ${timestamp()}.json file in the ${outputPath}`);
    });
  } else {
    // @TODO: Make API call
    // https://jira.almacareer.tech/browse/DS-559
  }
};

async function scanner({ source, outputPath, config, type }: Args) {
  try {
    await getRunnerCall({ outputPath, config, source, type });
  } catch (err) {
    errorMessage(`\n ${err}`);
  }
}

export default scanner;
