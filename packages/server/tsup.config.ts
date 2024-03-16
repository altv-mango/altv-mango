import { defineConfig } from 'tsup';
import packageJson from './package.json';

export default defineConfig({
    entry: ['src/index.ts'],
    splitting: false,
    sourcemap: 'inline',
    clean: false,
    format: 'esm',
    bundle: true,
    minify: false,
    external: [...Object.keys(packageJson.dependencies), ...Object.keys(packageJson.peerDependencies)],
    noExternal: [...Object.keys(packageJson.devDependencies)],
});
