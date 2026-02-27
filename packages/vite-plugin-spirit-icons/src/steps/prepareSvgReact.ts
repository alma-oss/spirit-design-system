import fs from 'fs';
import path from 'path';
import { filterSvgFiles } from './shared';

export const toPascalCase = (string: string): string =>
  string
    .replace('.svg', '')
    .replace(/\w+/g, (word) => {
      return word[0].toUpperCase() + word.slice(1).toLowerCase();
    })
    .replaceAll('-', '');

export const prepareSvgForReactComponent = (srcDir: string, distDir: string): void => {
  const files = fs.readdirSync(srcDir);
  const svgs = filterSvgFiles(files);
  if (svgs.length > 0) {
    // Ensure distDir exists
    if (!fs.existsSync(distDir)) {
      fs.mkdirSync(distDir, { recursive: true });
    }
    svgs.forEach((svg) => {
      const svgPath = path.join(srcDir, svg);
      const svgDistPath = path.join(distDir, `${toPascalCase(svg)}Icon.svg`);
      fs.copyFileSync(svgPath, svgDistPath);
    });
  }
};

export const prepareSvgReact = (srcDir: string, distDir: string): void => {
  prepareSvgForReactComponent(srcDir, distDir);
};
