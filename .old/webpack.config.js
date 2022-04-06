const HtmlWebpackPlugin = require("html-webpack-plugin");

// webpack.config.js
module.exports = [
  {
    mode: "development",
    entry: "./src/react.tsx",
    target: "electron-renderer",
    devtool: "source-map",
    resolve: {
      extensions: ['.tsx', '.jsx', '.ts', '.js']
    },
    module: {
      rules: [
        {
          test: /\.(t|j)s(x?)$/,
          include: /src/,
          use: [{ loader: "ts-loader" }],
        },
        {
          test: /\.(scss|css)$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    output: {
      path: __dirname + "/dist",
      filename: "react.js",
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index.html",
      }),
    ],
  },
];
