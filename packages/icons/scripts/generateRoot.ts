import fs from 'fs';
import path from 'path';

export const generateRoot = (stagingDir: string): void => {
  const indexContent = `// Auto-generated root barrel export
export * from './icons';
export * from './react';
`;

  const indexPath = path.join(stagingDir, 'index.ts');

  // Ensure parent directory exists
  if (!fs.existsSync(stagingDir)) {
    fs.mkdirSync(stagingDir, { recursive: true });
  }

  fs.writeFileSync(indexPath, indexContent);
};

if (require.main === module) {
  const stagingDir = path.resolve(__dirname, '../.icons-tmp');
  generateRoot(stagingDir);
}
