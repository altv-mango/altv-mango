import { defineConfig } from 'tsup';
import packageJson from './package.json';

export default defineConfig({
    entry: ['src/index.ts'],
    splitting: false,
    sourcemap: 'inline',
    clean: true,
    format: 'esm',
    external: ['@altv/server'],
    noExternal: Object.keys(packageJson.devDependencies),
});
