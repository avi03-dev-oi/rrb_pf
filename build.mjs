import { cp, mkdir, rm } from 'node:fs/promises';

await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });
await cp('index.html', 'dist/index.html');
await cp('styles.css', 'dist/styles.css');
await cp('app.js', 'dist/app.js');
await cp('app.config.ts', 'dist/app.config.ts');
await cp('public', 'dist/public', { recursive: true });
await cp('assets', 'dist/assets', { recursive: true });
console.log('Road to Rainbow build complete → dist');
