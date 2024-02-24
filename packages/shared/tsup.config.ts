import { defineConfig } from 'tsup';
import packageJson from './package.json';

export default defineConfig({
    entry: ['src/index.ts', 'src/app/index.ts'],
    splitting: true,
    sourcemap: 'inline',
    clean: true,
    format: 'esm',
    outDir: 'dist',
    bundle: true,
    external: Object.keys(packageJson.dependencies),
    noExternal: Object.keys(packageJson.devDependencies),
});
