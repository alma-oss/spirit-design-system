import fs from 'fs';
import path from 'path';

export const generateReactIndex = (reactDir: string): void => {
  // List all .tsx files in the react directory (excluding index.ts)
  const files = fs.readdirSync(reactDir);
  const tsxFiles = files.filter((f) => f.endsWith('.tsx') && f !== 'index.tsx').sort();

  if (tsxFiles.length > 0) {
    const lines: string[] = [];

    tsxFiles.forEach((file) => {
      const componentName = file.replace('.tsx', '');
      // svg2react-icon generates default exports, so we re-export them as named exports
      lines.push(`export { default as ${componentName} } from './${componentName}';`);
    });

    const indexContent = lines.join('\n') + '\n';
    const indexPath = path.join(reactDir, 'index.ts');

    // Ensure parent directory exists
    if (!fs.existsSync(reactDir)) {
      fs.mkdirSync(reactDir, { recursive: true });
    }

    fs.writeFileSync(indexPath, indexContent);
  }
};
