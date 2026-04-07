const fs = require('fs');
const path = require('path');
const jsdom = require('jsdom');
const { filterSvgFiles } = require('./shared');

const svgSrcDir = path.resolve(__dirname, '../dist/svg');
const distFile = path.resolve(__dirname, '../dist/icons.mjs');
const distDtsFile = path.resolve(__dirname, '../dist/icons.d.ts');
const { log: logMessage, warn: logWarning, error: logError } = console;

const buildConstants = (srcDir, file, dtsFile) => {
  try {
    const files = fs.readdirSync(srcDir);
    const svgs = filterSvgFiles(files).sort();

    if (svgs.length > 0) {
      const icons = {};
      const iconNames = [];
      let distContent = 'const icons = ';

      svgs.forEach((svg) => {
        const iconName = svg.replace('.svg', '');
        const svgPath = path.join(srcDir, svg);
        const svgFile = fs.readFileSync(svgPath, 'utf8');
        const dom = new jsdom.JSDOM(svgFile);
        const svgContent = dom.window.document.querySelector('svg').innerHTML.replaceAll('\n', '');

        icons[iconName] = svgContent;
        iconNames.push(iconName);
      });

      distContent += JSON.stringify(icons, null, 2);
      distContent += ';';
      distContent += `\n\nexport default icons;`;

      fs.writeFileSync(file, distContent);
      logMessage(`Successfully created ${file} with ${svgs.length} icons`);

      // Generate TypeScript declaration file when an output path is provided
      if (dtsFile) {
        const unionType = iconNames.map((name) => `'${name}'`).join(' | ');
        const dtsContent = `type IconName = ${unionType};\n\ndeclare const icons: Record<IconName, string>;\n\nexport default icons;\n`;
        fs.writeFileSync(dtsFile, dtsContent);
        logMessage(`Successfully created ${dtsFile}`);
      }

      return true;
    }

    logWarning(`No SVG files found in ${srcDir}`);

    return false;
  } catch (err) {
    logError(`Error building icon constants: ${err instanceof Error ? err.message : String(err)}`);

    return false;
  }
};

// Only run when this script is executed directly, not when imported
if (require.main === module) {
  const success = buildConstants(svgSrcDir, distFile, distDtsFile);
  if (!success) {
    process.exit(1);
  }
}

module.exports = { buildConstants };
