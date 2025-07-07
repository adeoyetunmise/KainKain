const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

// Paths to clean
const pathsToRemove = [
  '.next',
  'node_modules/.cache',
];

// Remove directories
pathsToRemove.forEach(p => {
  const fullPath = path.join(__dirname, p);
  try {
    if (fs.existsSync(fullPath)) {
      console.log(`Removing ${fullPath}...`);
      fs.rmSync(fullPath, { recursive: true, force: true });
    }
  } catch (err) {
    console.error(`Error removing ${fullPath}:`, err);
  }
});

// Reinstall dependencies
console.log('Reinstalling dependencies...');
try {
  // Check if using pnpm (based on the error message)
  execSync('pnpm install', { stdio: 'inherit' });
  
  // Install specific versions of problematic dependencies
  execSync('pnpm add framer-motion@10.16.4', { stdio: 'inherit' });
  execSync('pnpm add postcss@8.4.31 autoprefixer@10.4.16 tailwindcss@3.3.3 --save-dev', { stdio: 'inherit' });
  
  console.log('Dependencies reinstalled successfully.');
} catch (err) {
  console.error('Error reinstalling dependencies:', err);
}
