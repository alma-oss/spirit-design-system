import fs from 'fs';
import path from 'path';
import { transform, type Config } from '@svgr/core';
import jsxPlugin from '@svgr/plugin-jsx';
import { filterSvgFiles } from './shared';

// All Spirit icons are 24×24, so the size is fixed instead of being read from the source SVG
const DEFAULT_SIZE = '24';

// Local identifiers are fixed because Babel templates only accept AST nodes as substitutions
const template: NonNullable<Config['template']> = (variables, { tpl }) => tpl`
import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

const Icon = ({ size, ...props }: IconProps) => (
  ${variables.jsx}
);

Icon.displayName = '__DISPLAY_NAME__';

export default Icon;
`;

export const generateReactComponents = async (srcDir: string, distDir: string): Promise<void> => {
  const svgs = filterSvgFiles(fs.readdirSync(srcDir));

  if (svgs.length === 0) {
    return;
  }

  fs.mkdirSync(distDir, { recursive: true });

  await Promise.all(
    svgs.map(async (svg) => {
      const componentName = path.basename(svg, '.svg');
      let code: string;

      try {
        code = await transform(
          // xmlns is meaningless on inline JSX SVG
          fs.readFileSync(path.join(srcDir, svg), 'utf8').replace(/\sxmlns="[^"]*"/, ''),
          {
            plugins: [jsxPlugin],
            typescript: true,
            icon: false,
            dimensions: false,
            expandProps: 'end',
            svgProps: {
              fill: 'currentColor',
              width: `{size || '${DEFAULT_SIZE}'}`,
              height: `{size || '${DEFAULT_SIZE}'}`,
            },
            template,
          },
          { componentName },
        );
      } catch (error) {
        throw new Error(
          `Failed to generate React component ${componentName}: ${error instanceof Error ? error.message : String(error)}`,
        );
      }

      fs.writeFileSync(path.join(distDir, `${componentName}.tsx`), code.replace('__DISPLAY_NAME__', componentName));
    }),
  );
};
