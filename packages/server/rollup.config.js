import { defineConfig } from 'rollup';
import esbuild from 'rollup-plugin-esbuild';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import packageJson from './package.json' assert { type: 'json' };

export default defineConfig({
    input: 'src/index.ts',
    output: {
        file: 'dist/index.js',
        format: 'esm',
    },
    external: [...Object.keys(packageJson.dependencies), ...Object.keys(packageJson.peerDependencies)],
    plugins: [
        esbuild({
            sourceMap: 'inline',
            target: 'esnext',
            keepNames: true,
            // minify: true,
        }),
        nodeResolve({
            resolveOnly: [...Object.keys(packageJson.devDependencies)],
        }),
        commonjs(),
    ],
});
