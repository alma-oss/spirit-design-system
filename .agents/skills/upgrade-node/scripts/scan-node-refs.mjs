#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const SKIP_DIRS = new Set(['node_modules', 'dist', '.yarn', '.git', '.icons-tmp']);
const SKIP_FILES = new Set(['yarn.lock', 'package-lock.json']);

const parseArgs = (argv) => {
  const options = { pretty: false, expectMin: null, root: process.cwd() };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === '--pretty') {
      options.pretty = true;
    } else if (arg === '--expect-min') {
      options.expectMin = Number.parseInt(argv[index + 1], 10);
      index += 1;
    } else if (arg === '--root') {
      options.root = path.resolve(argv[index + 1]);
      index += 1;
    } else if (arg === '--help' || arg === '-h') {
      console.log(`Usage: node scan-node-refs.mjs [options]

Options:
  --pretty              Print markdown table instead of JSON
  --expect-min <major>  Exit 1 if engines or .nvmrc are below expected minimum
  --root <path>         Repository root (default: cwd)
`);
      process.exit(0);
    }
  }

  return options;
};

const readText = (root, relativePath) => {
  const absolutePath = path.join(root, relativePath);

  if (!fs.existsSync(absolutePath)) {
    return null;
  }

  return fs.readFileSync(absolutePath, 'utf8');
};

const walkFiles = (directory, matcher, results = []) => {
  if (!fs.existsSync(directory)) {
    return results;
  }

  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) {
      continue;
    }

    if (SKIP_FILES.has(entry.name)) {
      continue;
    }

    const absolutePath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      walkFiles(absolutePath, matcher, results);
      continue;
    }

    if (matcher(absolutePath)) {
      results.push(absolutePath);
    }
  }

  return results;
};

const toRelative = (root, absolutePath) => path.relative(root, absolutePath).split(path.sep).join('/');

const parseEngineMajor = (engineValue) => {
  if (!engineValue) {
    return null;
  }

  const match = engineValue.match(/(\d+)/);

  return match ? Number.parseInt(match[1], 10) : null;
};

const parseNvmrcMajor = (nvmrc) => {
  if (!nvmrc) {
    return null;
  }

  const match = nvmrc.trim().match(/^v?(\d+)/);

  return match ? Number.parseInt(match[1], 10) : null;
};

const scanEngines = (root) => {
  const packageFiles = walkFiles(root, (filePath) => path.basename(filePath) === 'package.json');
  const engines = [];

  for (const packageFile of packageFiles) {
    try {
      const content = JSON.parse(fs.readFileSync(packageFile, 'utf8'));

      if (content.engines?.node) {
        engines.push({
          file: toRelative(root, packageFile),
          node: content.engines.node,
        });
      }
    } catch {
      // Ignore invalid JSON outside the upgrade scope.
    }
  }

  engines.sort((left, right) => left.file.localeCompare(right.file));

  return engines;
};

const scanCiMatrix = (root) => {
  const workflowDir = path.join(root, '.github/workflows');

  if (!fs.existsSync(workflowDir)) {
    return null;
  }

  for (const workflowFile of fs.readdirSync(workflowDir)) {
    if (!workflowFile.endsWith('.yaml') && !workflowFile.endsWith('.yml')) {
      continue;
    }

    const relativePath = `.github/workflows/${workflowFile}`;
    const content = readText(root, relativePath);
    const match = content?.match(/node-version:\s*\[([^\]]+)\]/);

    if (match) {
      const nodeVersions = match[1]
        .split(',')
        .map((value) => Number.parseInt(value.trim(), 10))
        .filter((value) => !Number.isNaN(value));

      return {
        file: relativePath,
        nodeVersions,
      };
    }
  }

  return null;
};

const scanTypesNodeCatalog = (root) => {
  const content = readText(root, '.yarnrc.yml');
  const match = content?.match(/['"]@types\/node['"]:\s*([\d.]+)/);

  if (!match) {
    return null;
  }

  return {
    file: '.yarnrc.yml',
    version: match[1],
  };
};

const scanToolsReadme = (root) => {
  const content = readText(root, 'tools/README.md');
  const match = content?.match(/Node\.js\s*≥\s*(\d+)/);

  if (!match) {
    return null;
  }

  return {
    file: 'tools/README.md',
    minimum: match[1],
  };
};

const scanDockerImages = (root) => {
  const dockerFiles = walkFiles(root, (filePath) => {
    const basename = path.basename(filePath);

    return (
      basename === 'devcontainer.json' ||
      basename.startsWith('docker-compose') ||
      basename === 'Dockerfile' ||
      basename.endsWith('.Dockerfile')
    );
  });

  const images = [];

  for (const dockerFile of dockerFiles) {
    const content = fs.readFileSync(dockerFile, 'utf8');
    const matches = content.matchAll(/node:(\d+(?:\.\d+){0,2}(?:-[a-z0-9-]+)?)/g);

    for (const match of matches) {
      images.push({
        file: toRelative(root, dockerFile),
        image: `node:${match[1]}`,
      });
    }
  }

  return images.sort((left, right) => left.file.localeCompare(right.file));
};

const findLatestMigrationGuide = (root, packageName) => {
  const packagePath = path.join(root, 'docs/migrations', packageName);

  if (!fs.existsSync(packagePath)) {
    return null;
  }

  let latestVersion = -1;
  let latestFile = null;

  for (const guideFile of fs.readdirSync(packagePath)) {
    const match = guideFile.match(/^migration-v(\d+)\.md$/);

    if (!match) {
      continue;
    }

    const version = Number.parseInt(match[1], 10);

    if (version > latestVersion) {
      latestVersion = version;
      latestFile = toRelative(root, path.join(packagePath, guideFile));
    }
  }

  return latestFile;
};

const scanLatestMigrationGuides = (root) => ({
  web: findLatestMigrationGuide(root, 'web'),
  webReact: findLatestMigrationGuide(root, 'web-react'),
});

const scanMigrationGuides = (root) => {
  const migrationRoot = path.join(root, 'docs/migrations');

  if (!fs.existsSync(migrationRoot)) {
    return [];
  }

  const guides = [];

  for (const packageDir of fs.readdirSync(migrationRoot, { withFileTypes: true })) {
    if (!packageDir.isDirectory()) {
      continue;
    }

    const packagePath = path.join(migrationRoot, packageDir.name);

    for (const guideFile of fs.readdirSync(packagePath)) {
      if (!guideFile.startsWith('migration-v') || !guideFile.endsWith('.md')) {
        continue;
      }

      const relativePath = toRelative(root, path.join(packagePath, guideFile));
      const content = readText(root, relativePath);

      guides.push({
        file: relativePath,
        hasNodeDropSection: /###\s+Dropped Support for Node\.js/i.test(content ?? ''),
      });
    }
  }

  return guides.sort((left, right) => left.file.localeCompare(right.file));
};

const buildSummary = ({ nvmrc, engines, ciMatrix, typesNodeCatalog, toolsReadme }) => {
  const issues = [];
  const engineMajors = engines
    .map((entry) => parseEngineMajor(entry.node))
    .filter((value) => value !== null);
  const minEngineMajor = engineMajors.length > 0 ? Math.min(...engineMajors) : null;
  const maxEngineMajor = engineMajors.length > 0 ? Math.max(...engineMajors) : null;
  const uniqueEngineValues = [...new Set(engines.map((entry) => entry.node))];
  const nvmrcMajor = parseNvmrcMajor(nvmrc);

  if (engines.length === 0) {
    issues.push('No package.json files with engines.node were found.');
  }

  if (uniqueEngineValues.length > 1) {
    issues.push(`Inconsistent engines.node values: ${uniqueEngineValues.join(', ')}`);
  }

  if (nvmrcMajor !== null && minEngineMajor !== null && nvmrcMajor < minEngineMajor) {
    issues.push(`.nvmrc major (${nvmrcMajor}) is lower than minimum engines.node major (${minEngineMajor}).`);
  }

  if (nvmrcMajor !== null && maxEngineMajor !== null && nvmrcMajor > maxEngineMajor) {
    issues.push(`.nvmrc major (${nvmrcMajor}) is higher than engines.node major (${maxEngineMajor}).`);
  }

  if (!ciMatrix) {
    issues.push('No CI node-version matrix found in .github/workflows/*.yaml.');
  }

  if (!typesNodeCatalog) {
    issues.push('No @types/node catalog entry found in .yarnrc.yml.');
  }

  if (!toolsReadme) {
    issues.push('No Node.js minimum found in tools/README.md.');
  }

  return {
    enginesFileCount: engines.length,
    minEngineMajor,
    maxEngineMajor,
    nvmrcMajor,
    issues,
  };
};

const validateExpectMin = (snapshot, expectMin) => {
  const failures = [];

  if (Number.isNaN(expectMin)) {
    failures.push('--expect-min requires a numeric major version.');
    return failures;
  }

  if (snapshot.summary.nvmrcMajor !== null && snapshot.summary.nvmrcMajor < expectMin) {
    failures.push(`.nvmrc major ${snapshot.summary.nvmrcMajor} is below expected minimum ${expectMin}.`);
  }

  for (const engine of snapshot.engines) {
    const major = parseEngineMajor(engine.node);

    if (major !== null && major < expectMin) {
      failures.push(`${engine.file} has engines.node ${engine.node}, below expected minimum ${expectMin}.`);
    }
  }

  if (snapshot.toolsReadme) {
    const toolsMinimum = Number.parseInt(snapshot.toolsReadme.minimum, 10);

    if (!Number.isNaN(toolsMinimum) && toolsMinimum < expectMin) {
      failures.push(
        `${snapshot.toolsReadme.file} documents Node.js ≥ ${toolsMinimum}, below expected minimum ${expectMin}.`,
      );
    }
  }

  return failures;
};

const printPretty = (snapshot) => {
  console.log('# Node.js reference scan\n');
  console.log(`| Field | Value |`);
  console.log(`| --- | --- |`);
  console.log(`| .nvmrc | ${snapshot.nvmrc ?? '—'} |`);
  console.log(`| engines files | ${snapshot.summary.enginesFileCount} |`);
  console.log(`| min engines major | ${snapshot.summary.minEngineMajor ?? '—'} |`);
  console.log(`| CI matrix | ${snapshot.ciMatrix ? `[${snapshot.ciMatrix.nodeVersions.join(', ')}]` : '—'} |`);
  console.log(`| @types/node | ${snapshot.typesNodeCatalog?.version ?? '—'} |`);
  console.log(`| tools README min | ${snapshot.toolsReadme?.minimum ?? '—'} |`);
  console.log(`| latest web migration | ${snapshot.latestMigrationGuides.web ?? '—'} |`);
  console.log(`| latest web-react migration | ${snapshot.latestMigrationGuides.webReact ?? '—'} |`);
  console.log('');

  if (snapshot.engines.length > 0) {
    console.log('## engines.node\n');
    console.log('| File | Value |');
    console.log('| --- | --- |');

    for (const engine of snapshot.engines) {
      console.log(`| ${engine.file} | ${engine.node} |`);
    }

    console.log('');
  }

  if (snapshot.dockerImages.length > 0) {
    console.log('## Docker images\n');
    console.log('| File | Image |');
    console.log('| --- | --- |');

    for (const dockerImage of snapshot.dockerImages) {
      console.log(`| ${dockerImage.file} | ${dockerImage.image} |`);
    }

    console.log('');
  }

  if (snapshot.migrationGuides.length > 0) {
    console.log('## Migration guides\n');
    console.log('| File | Node drop section |');
    console.log('| --- | --- |');

    for (const guide of snapshot.migrationGuides) {
      console.log(`| ${guide.file} | ${guide.hasNodeDropSection ? 'yes' : 'no'} |`);
    }

    console.log('');
  }

  if (snapshot.summary.issues.length > 0) {
    console.log('## Issues\n');

    for (const issue of snapshot.summary.issues) {
      console.log(`- ${issue}`);
    }

    console.log('');
  }
};

const main = () => {
  const options = parseArgs(process.argv.slice(2));
  const nvmrcContent = readText(options.root, '.nvmrc');
  const engines = scanEngines(options.root);
  const ciMatrix = scanCiMatrix(options.root);
  const typesNodeCatalog = scanTypesNodeCatalog(options.root);
  const toolsReadme = scanToolsReadme(options.root);
  const dockerImages = scanDockerImages(options.root);
  const migrationGuides = scanMigrationGuides(options.root);
  const latestMigrationGuides = scanLatestMigrationGuides(options.root);

  const snapshot = {
    nvmrc: nvmrcContent?.trim().split('\n').find(Boolean) ?? null,
    engines,
    ciMatrix,
    typesNodeCatalog,
    toolsReadme,
    dockerImages,
    migrationGuides,
    latestMigrationGuides,
    summary: buildSummary({
      nvmrc: nvmrcContent?.trim().split('\n').find(Boolean) ?? null,
      engines,
      ciMatrix,
      typesNodeCatalog,
      toolsReadme,
    }),
  };

  if (options.pretty) {
    printPretty(snapshot);
  } else {
    console.log(JSON.stringify(snapshot, null, 2));
  }

  if (options.expectMin !== null) {
    const failures = validateExpectMin(snapshot, options.expectMin);

    if (failures.length > 0) {
      if (!options.pretty) {
        console.error(JSON.stringify({ expectMin: options.expectMin, failures }, null, 2));
      } else {
        console.error('Validation failed:\n');

        for (const failure of failures) {
          console.error(`- ${failure}`);
        }
      }

      process.exit(1);
    }
  }
};

main();
