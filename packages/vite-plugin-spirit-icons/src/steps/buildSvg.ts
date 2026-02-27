import fs from 'fs';
import path from 'path';
import { cssVariablePrefix } from '@alma-oss/spirit-design-tokens';
import { filterSvgFiles, getIconType, ICON_TYPE_DUALTONE, ICON_TYPE_COLORED } from './shared';

export const DUALTONE_COLOR_BACKGROUND_DEFAULT = '#F2F2F2'; // Gray95
export const DUALTONE_COLOR_BORDER_DEFAULT = '#202020'; // DarkGray

export const normalizeSvgColors = (fileName: string, svgContent: string): string => {
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

export const normalizeAndCopySvg = (srcDir: string, distDir: string): void => {
  // Ensure destination directory exists
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

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
      fs.writeFileSync(svgDistPath, svgContentNormalized);
    });

    sprite += '</svg>';

    fs.writeFileSync(spriteDistFile, sprite);
  }
};

export const buildSvg = (srcDir: string, distDir: string): void => {
  normalizeAndCopySvg(srcDir, distDir);
};
