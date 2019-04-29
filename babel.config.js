const packageConfig = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['>0.2%', 'not dead', 'not op_mini all'],
        },
        exclude: ['transform-async-to-generator', 'transform-regenerator'],
        loose: true,
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-proposal-object-rest-spread', { loose: true }],
    '@babel/plugin-transform-object-assign',
    '@babel/plugin-transform-runtime',
    'babel-plugin-transform-react-constant-elements',
    ['babel-plugin-react-remove-properties', { properties: ['data-testid'] }],
    [
      'babel-plugin-transform-react-remove-prop-types',
      {
        mode: 'unsafe-wrap',
      },
    ],
  ],
  ignore: [/@babel[\\|/]runtime/],
};

const docsConfig = {
  presets: [
    [
      'babel-preset-gatsby',
      {
        targets: {
          browsers: ['>0.25%', 'not dead'],
        },
      },
    ],
  ],
  plugins: ['@babel/plugin-proposal-optional-chaining'],
};

module.exports = {
  env: {
    cjs: packageConfig,
    esm: packageConfig,
    es: packageConfig,
    umd: packageConfig,
    'docs-development': docsConfig,
    'docs-production': {
      ...docsConfig,
      plugins: [
        ...docsConfig.plugins,
        'babel-plugin-transform-react-constant-elements',
        [
          'babel-plugin-react-remove-properties',
          { properties: ['data-testid'] },
        ],
        ['babel-plugin-transform-react-remove-prop-types', { mode: 'remove' }],
      ],
    },
  },
};
