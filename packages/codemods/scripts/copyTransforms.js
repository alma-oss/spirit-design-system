import fs from 'fs';
import path from 'path';

const excludedDirectories = ['__tests__', '__testfixtures__'];

const copyTasks = [
  { source: './src/transforms', destination: './dist/transforms' },
  { source: './src/helpers', destination: './dist/helpers' },
];

function copyFolderRecursive(src, dest) {
  if (!fs.existsSync(src)) {
    throw new Error(`Source path doesn't exist: ${src}`);
  }

  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const items = fs.readdirSync(src);

  items.forEach((item) => {
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);

    if (fs.statSync(srcPath).isDirectory()) {
      if (!excludedDirectories.includes(item)) {
        copyFolderRecursive(srcPath, destPath);
      }
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

copyTasks.forEach(({ source, destination }) => {
  copyFolderRecursive(source, destination);
});
