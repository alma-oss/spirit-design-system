const fs = require('fs');
const path = require('path');
const jsdom = require('jsdom');
const { filterSvgFiles } = require('./shared');

const svgSrcDir = path.resolve(__dirname, '../dist/svg');
const distFile = path.resolve(__dirname, '../dist/icons.mjs');

const buildConstants = (srcDir, file) => {
  fs.readdir(srcDir, (err, files) => {
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
    }
  });
};

buildConstants(svgSrcDir, distFile);

module.exports = { buildConstants };
