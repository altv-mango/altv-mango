import { defineConfig } from 'tsup';
import packageJson from './package.json';
import { altvEsbuild } from 'altv-esbuild';

export default defineConfig({
    entry: ['src/index.ts'],
    outDir: 'dist',
    splitting: false,
    // sourcemap: 'inline',
    clean: true,
    dts: false,
    format: 'esm',
    bundle: true,
    minify: false,
    external: Object.keys(packageJson.dependencies),
    noExternal: [...Object.keys(packageJson.devDependencies), '@altv-mango/server'],
    // esbuildOptions(options) {
    //     options.external = Object.keys(packageJson.dependencies);
    // },
    esbuildPlugins: [
        // altvEsbuild({
        //     mode: 'server',
        //     dev: {
        //         enabled: true,
        //         enhancedRestartCommand: false,
        //         topLevelExceptionHandling: false,
        //     },
        // }),
    ],
});
