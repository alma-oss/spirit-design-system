const fs = require('fs');
const path = require('path');
const { cssVariablePrefix } = require('@alma-oss/spirit-design-tokens');
const { filterSvgFiles, getIconType, ICON_TYPE_DUALTONE, ICON_TYPE_COLORED } = require('./shared');

const svgSrcDir = path.resolve(__dirname, '../src/svg');
const svgDistDir = path.resolve(__dirname, '../dist/svg');
const { log: logMessage, warn: logWarning, error: logError } = console;

const DUALTONE_COLOR_BACKGROUND_DEFAULT = '#F2F2F2'; // Gray95
const DUALTONE_COLOR_BORDER_DEFAULT = '#202020'; // DarkGray

const normalizeSvgColors = (fileName, svgContent) => {
  const iconType = getIconType(fileName);

  switch (iconType) {
    case ICON_TYPE_DUALTONE:
      return svgContent
        .replace(
          new RegExp(DUALTONE_COLOR_BACKGROUND_DEFAULT, 'g'),
          `var(--${cssVariablePrefix}icon-dualtone-color-background, ${DUALTONE_COLOR_BACKGROUND_DEFAULT})`,
        )
        .replace(
          new RegExp(DUALTONE_COLOR_BORDER_DEFAULT, 'g'),
          `var(--${cssVariablePrefix}icon-dualtone-color-border, ${DUALTONE_COLOR_BORDER_DEFAULT})`,
        );

    case ICON_TYPE_COLORED:
      return svgContent;

    default:
      return svgContent.replace(/fill="#\w+"/g, 'fill="currentColor"');
  }
};

const normalizeAndCopySvg = (srcDir, distDir) => {
  try {
    const files = fs.readdirSync(srcDir);
    const svgs = filterSvgFiles(files);

    if (svgs.length > 0) {
      let sprite = '<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">\n';
      const spriteDistFile = path.join(distDir, 'sprite.svg');

      svgs.forEach((svg) => {
        const svgPath = path.join(srcDir, svg);
        const svgDistPath = path.join(distDir, svg);
        const svgContent = fs.readFileSync(svgPath, 'utf8');
        const svgContentNormalized = normalizeSvgColors(svg, svgContent);
        const svgSpriteContent = svgContentNormalized
          .replace(/<svg.*(viewBox="(\d+\s){3}\d+").*>/, `<symbol id="${svg.slice(0, -4)}" $1>`)
          .replace(/<\/svg>/g, '</symbol>');
        sprite += svgSpriteContent;
        fs.writeFileSync(path.join(svgDistPath), svgContentNormalized);
      });

      sprite += '</svg>';

      fs.writeFileSync(spriteDistFile, sprite);
      logMessage(`Successfully normalized and copied ${svgs.length} SVG files`);

      return true;
    }

    logWarning(`No SVG files found in ${srcDir}`);

    return false;
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    logError(`Error normalizing SVGs: ${errorMessage}`);

    return false;
  }
};

// Only run when this script is executed directly, not when imported
if (require.main === module) {
  const success = normalizeAndCopySvg(svgSrcDir, svgDistDir);
  if (!success) {
    process.exit(1);
  }
}

module.exports = {
  DUALTONE_COLOR_BACKGROUND_DEFAULT,
  DUALTONE_COLOR_BORDER_DEFAULT,
  normalizeSvgColors,
  normalizeAndCopySvg,
};
