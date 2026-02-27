import fs from 'fs';
import path from 'path';
// eslint-disable-next-line import/no-extraneous-dependencies
import { JSDOM } from 'jsdom';
import { filterSvgFiles } from './shared';

export const buildConstants = (srcDir: string, file: string): void => {
  const files = fs.readdirSync(srcDir);
  const svgs = filterSvgFiles(files);

  if (svgs.length > 0) {
    const icons: Record<string, string> = {};
    let distContent = 'const icons = ';

    svgs.forEach((svg) => {
      const iconName = svg.replace('.svg', '');
      const svgPath = path.join(srcDir, svg);
      const svgFileContent = fs.readFileSync(svgPath, 'utf8');
      const dom = new JSDOM(svgFileContent);
      const svgContent = dom.window.document.querySelector('svg')?.innerHTML.replaceAll('\n', '') || '';

      icons[iconName] = svgContent;
    });

    distContent += JSON.stringify(icons, null, 2);
    distContent += ';';
    // eslint-disable-next-line quotes -- we need to use special chars in this string
    distContent += `\n\nexport default icons;`;

    // Ensure parent directory exists
    const dirName = path.dirname(file);
    if (!fs.existsSync(dirName)) {
      fs.mkdirSync(dirName, { recursive: true });
    }

    fs.writeFileSync(file, distContent);
  }
};
