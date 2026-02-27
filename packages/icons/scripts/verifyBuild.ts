import fs from 'fs';
import path from 'path';

const ROOT = path.resolve(__dirname, '..');
const DIST_DIR = path.join(ROOT, 'dist');

interface VerificationResult {
  passed: boolean;
  errors: string[];
}

function verifyBuild(): VerificationResult {
  const errors: string[] = [];

  // Check main entry points
  const mainEntries = ['index.js', 'index.cjs', 'index.d.ts', 'icons.js', 'icons.cjs', 'icons.d.ts'];
  mainEntries.forEach((file) => {
    const filePath = path.join(DIST_DIR, file);
    if (!fs.existsSync(filePath)) {
      errors.push(`Missing main entry point: ${file}`);
    }
  });

  // Check react directory
  const reactDir = path.join(DIST_DIR, 'react');
  if (!fs.existsSync(reactDir)) {
    errors.push('Missing react directory');
  } else {
    const reactEntries = ['index.js', 'index.cjs', 'index.d.ts'];
    reactEntries.forEach((file) => {
      const filePath = path.join(reactDir, file);
      if (!fs.existsSync(filePath)) {
        errors.push(`Missing react entry point: ${file}`);
      }
    });

    // Check that there are react component files
    const reactFiles = fs.readdirSync(reactDir);
    const componentFiles = reactFiles.filter((f) => f.endsWith('.js') || f.endsWith('.cjs'));
    if (componentFiles.length === 0) {
      errors.push('No React component files found in react directory');
    }
  }

  // Check svg directory
  const svgDir = path.join(DIST_DIR, 'svg');
  if (!fs.existsSync(svgDir)) {
    errors.push('Missing svg directory');
  } else {
    const svgFiles = fs.readdirSync(svgDir).filter((f) => f.endsWith('.svg'));
    if (svgFiles.length === 0) {
      errors.push('No SVG files found in svg directory');
    }
    if (!svgFiles.includes('sprite.svg')) {
      errors.push('Missing sprite.svg');
    }
  }

  // Check that .icons-tmp does not exist (should be cleaned up)
  const tmpDir = path.join(ROOT, '.icons-tmp');
  if (fs.existsSync(tmpDir)) {
    errors.push('Staging directory .icons-tmp was not cleaned up');
  }

  return {
    passed: errors.length === 0,
    errors,
  };
}

const result = verifyBuild();

if (!result.passed) {
  console.error('Build verification failed:');
  result.errors.forEach((error) => {
    console.error(`  ✗ ${error}`);
  });
  process.exit(1);
} else {
  console.log('✓ Build verification passed');
}
