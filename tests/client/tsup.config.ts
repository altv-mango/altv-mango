import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/index.ts'],
    outDir: '../../server/resources/test/client',
    splitting: false,
    sourcemap: 'inline',
    clean: true,
    dts: false,
    format: 'esm',
    bundle: true,
    external: ['@altv/client'],
    noExternal: ['@abraham/reflection', '@altv-mango/client'],
    minify: false,
});
