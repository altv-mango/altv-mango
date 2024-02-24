import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/index.ts'],
    outDir: '../../server/resources/test/server',
    splitting: false,
    sourcemap: 'inline',
    clean: true,
    dts: false,
    format: 'esm',
    bundle: true,
    external: ['@altv/server'],
    noExternal: ['@abraham/reflection', '@altv-mango/server'],
    minify: false,
});
