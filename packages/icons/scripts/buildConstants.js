const fs = require('fs');
const path = require('path');
const jsdom = require('jsdom');
const { filterSvgFiles } = require('./shared');

const svgSrcDir = path.resolve(__dirname, '../dist/svg');
const distFile = path.resolve(__dirname, '../dist/icons.mjs');
const { log: logMessage, warn: logWarning, error: logError } = console;

const buildConstants = (srcDir, file) => {
  try {
    const files = fs.readdirSync(srcDir);
    const svgs = filterSvgFiles(files);

    if (svgs.length > 0) {
      const icons = {};
      let distContent = 'const icons = ';

      svgs.forEach((svg) => {
        const iconName = svg.replace('.svg', '');
        const svgPath = path.join(srcDir, svg);
        const svgFile = fs.readFileSync(svgPath, 'utf8');
        const dom = new jsdom.JSDOM(svgFile);
        const svgContent = dom.window.document.querySelector('svg').innerHTML.replaceAll('\n', '');

        icons[iconName] = svgContent;
      });

      distContent += JSON.stringify(icons, null, 2);
      distContent += ';';
      distContent += `\n\nexport default icons;`;

      fs.writeFileSync(file, distContent);
      logMessage(`Successfully created ${file} with ${svgs.length} icons`);

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
  const success = buildConstants(svgSrcDir, distFile);
  if (!success) {
    process.exit(1);
  }
}

module.exports = { buildConstants };
