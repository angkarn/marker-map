import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import pkg from '../package.json';
import { terser } from 'rollup-plugin-terser';

export default [
    // browser-friendly UMD build
    {
        input: 'src/main.js',
        output: {
            name: "MarkerMap",
            file: pkg.browser,
            format: 'umd',
        },
        plugins: [
            resolve(),
            commonjs(),
            terser()

        ]
    },
    {
        input: 'src/main.js',
        output: [
            {
                file: pkg.main,
                format: 'cjs',
            },
            {
                file: pkg.module,
                format: 'es',
            },
        ]
    }
];