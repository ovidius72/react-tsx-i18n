const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const getConfig = require('./webpack.config.common');

module.exports = (env, {mode}) => {
  return getConfig(mode, ({pathsToClean, cleanConfig}, baseConfig) => {
    return merge(baseConfig, {
      module: {
        rules: [
          {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader'],
          },
        ],
      },
      plugins: [
        new CleanWebpackPlugin(pathsToClean, cleanConfig),
        new MiniCssExtractPlugin({
          filename: '[name].css',
          chunkFilename: '[id].css',
        }),
      ],
      stats: 'errors-only',
      devtool: 'none',
      optimization: {
        runtimeChunk: 'single',
        minimizer: [
          new UglifyJSPlugin({
            test: /\.(js|jsx)($|\?)/i,
          }),
        ],
      },
    });
  });
};
