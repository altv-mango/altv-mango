import { defineConfig } from 'rollup';
import esbuild from 'rollup-plugin-esbuild';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default defineConfig({
    input: 'src/index.ts',
    output: {
        file: 'dist/index.js',
        format: 'esm',
    },
    plugins: [
        esbuild({
            // sourceMap: 'inline',
            target: 'esnext',
            // minify: true,
        }),
        nodeResolve(),
        commonjs(),
    ],
});
