import { defineConfig } from 'tsup';
import packageJson from './package.json';

export default defineConfig({
    entry: ['src/index.ts'],
    outDir: '../../server/resources/test/server',
    splitting: false,
    sourcemap: 'inline',
    clean: true,
    dts: false,
    format: 'esm',
    bundle: true,
    minify: true,
    external: Object.keys(packageJson.dependencies),
    noExternal: Object.keys(packageJson.devDependencies),
});
