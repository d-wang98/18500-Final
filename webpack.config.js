const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const ElectronReloadPlugin = require('webpack-electron-reload')({
  path: path.join(__dirname, './build/main.js'),
});

module.exports = [
  {
    mode: 'development',
    entry: './src/main.ts',
    target: 'electron-main',
    resolve: {
      extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          include: /src/,
          use: [{ loader: 'ts-loader' }],
        },
        // {
        //   test: /\.(scss|css)$/,
        //   use: ['style-loader', 'css-loader'],
        // },
      ],
    },
    output: {
      path: __dirname + '/build',
      filename: 'main.js',
    },
  },
  {
    mode: 'development',
    entry: './src/render.tsx',
    target: 'electron-renderer',
    devtool: 'source-map',
    resolve: {
      extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          include: /src/,
          use: [{ loader: 'ts-loader' }],
        },
        {
          test: /\.(scss|css)$/,
          use: ['css-loader'],
        },
      ],
    },
    output: {
      path: __dirname + '/build',
      filename: 'render.js',
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
      }),
      ElectronReloadPlugin(),
    ],
  },
];
