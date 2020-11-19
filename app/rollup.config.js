import { terser } from 'rollup-plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import serve from 'rollup-plugin-serve';
import svelte from 'rollup-plugin-svelte';
import livereload from 'rollup-plugin-livereload';
import postcss from 'rollup-plugin-postcss';

const PORT = process.env.PORT || 3000;
const PROD = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/main.js',
  context: 'window',
  moduleContext: 'window',
  output: {
    sourcemap: !PROD,
    format: 'iife',
    name: 'app',
    file: 'public/build/bundle.js',
  },
  plugins: [
    svelte({
      hydratable: true,
      dev: !PROD,
      css: (css) => css.write('bundle.css', !PROD),
    }),
    postcss({
      extract: true,
    }),
    resolve({ browser: true, dedupe: ['svelte'] }),
    commonjs(),
    !PROD && serve({ contentBase: ['public'], port: PORT }),
    !PROD && livereload('public'),
    PROD && terser(),
  ],
};
