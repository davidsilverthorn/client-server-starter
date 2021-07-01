import { copySync, removeSync } from 'fs-extra'
import { appConfig } from './package.json'
import tailwind from 'tailwindcss'
import postcssImport from 'postcss-import'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import autoPreprocess from 'svelte-preprocess'
import livereload from 'rollup-plugin-livereload'
import svelte from 'rollup-plugin-svelte'

const { assetsDir, distDir, buildDir } = appConfig
const production = process.env['NODE_ENV'] === 'production'

// clear previous builds
removeSync(distDir);
copySync(assetsDir, distDir)

export default {
    preserveEntrySignatures: false,
    input: [`src/main.js`],
    output: {
        sourcemap: true,
        format: 'esm',
        dir: buildDir,
        chunkFileNames: `[name]${(production && '-[hash]') || ''}.js`,
    },
    plugins: [
        svelte({
            preprocess: [
                autoPreprocess({
                    postcss: {
                        plugins: [
                            tailwind({
                                mode: 'jit',
                                darkMode: 'class',
                                future: {
                                    removeDeprecatedGapUtilities: true,
                                    purgeLayersByDefault: true,
                                },
                                plugins: [],
                                purge: {
                                    content: ['./src/**/*.svelte'],
                                    enabled: production,
                                },
                            }),
                            postcssImport,
                        ],
                    },
                }),
            ],
        }),
        resolve({
            browser: true,
            dedupe: (importee) => !!importee.match(/svelte(\/|$)/),
        }),
        commonjs(),
        production && terser(), !production && livereload(distDir), // refresh entire window when code is updated
    ],
    watch: {
        clearScreen: false,
    },
}