import { terser } from 'rollup-plugin-terser';
import pluginTypescript from '@rollup/plugin-typescript';
import pkg from './package.json';

const moduleName = pkg.name.replace(/^@.*\//, '');
const inputFileName = 'src/index.ts';
const author = pkg.author.name;
const banner = `
  /**
   * @license
   * author: ${author}
   * ${moduleName}.js v${pkg.version}
   * Released under the ${pkg.license} license.
   */
`;

export default [
  {
    input: inputFileName,
    output: [
      {
        format: 'es',
        banner,
        exports: 'named',
        sourcemap: true,
        file: pkg.module,
      },
      {
        format: 'cjs',
        sourcemap: true,
        banner,
        exports: 'named',
        file: pkg.main,
      },
    ],
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.devDependencies || {}),
    ],
    plugins: [pluginTypescript({ tsconfig: './tsconfig.json' }), terser()],
  },
];
