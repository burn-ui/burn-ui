import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import nodeGlobals from 'rollup-plugin-node-globals';
import { terser } from 'rollup-plugin-terser';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';

const input = './src/components/index.js';

const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
  'styled-components': 'styled-components',
};

const babelOptions = {
  exclude: /node_modules/,
  // We are using @babel/plugin-transform-runtime
  runtimeHelpers: true,
  configFile: './babel.config.js',
};

const commonjsOptions = {
  ignoreGlobal: true,
  include: /node_modules/,
  namedExports: {
    './node_modules/prop-types/index.js': [
      'elementType',
      'bool',
      'func',
      'object',
      'oneOfType',
      'element',
    ],
    './node_modules/react-is/index.js': [
      'ForwardRef',
      'isLazy',
      'isMemo',
      'isValidElementType',
    ],
  },
};

function onwarn(warning) {
  throw Error(warning.message);
}

export default [
  {
    input,
    onwarn,
    output: {
      file: 'build/umd/burn-ui.development.js',
      format: 'umd',
      name: 'BurnUI',
      globals,
    },
    external: Object.keys(globals),
    plugins: [
      nodeResolve(),
      babel(babelOptions),
      commonjs(commonjsOptions),
      nodeGlobals(), // Wait for https://github.com/cssinjs/jss/pull/893
      replace({ 'process.env.NODE_ENV': JSON.stringify('development') }),
    ],
  },
  {
    input,
    onwarn,
    output: {
      file: 'build/umd/burn-ui.production.min.js',
      format: 'umd',
      name: 'BurnUI',
      globals,
    },
    external: Object.keys(globals),
    plugins: [
      nodeResolve(),
      babel(babelOptions),
      commonjs(commonjsOptions),
      nodeGlobals(), // Wait for https://github.com/cssinjs/jss/pull/893
      replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
      sizeSnapshot({ snapshotPath: 'size-snapshot.json' }),
      terser(),
    ],
  },
];
