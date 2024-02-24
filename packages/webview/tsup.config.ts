import { defineConfig } from 'tsup';
import packageJson from './package.json';

export default defineConfig({
    entry: ['src/index.ts'],
    splitting: true,
    sourcemap: 'inline',
    clean: true,
    format: 'esm',
    bundle: true,
    external: Object.keys(packageJson.dependencies),
    noExternal: Object.keys(packageJson.devDependencies),
});
