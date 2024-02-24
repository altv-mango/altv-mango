import { defineConfig } from 'tsup';
import packageJson from './package.json';

export default defineConfig({
    entry: ['src/index.ts'],
    splitting: false,
    sourcemap: 'inline',
    clean: true,
    format: 'esm',
    external: [...Object.keys(packageJson.dependencies), ...Object.keys(packageJson.devDependencies)],
});
