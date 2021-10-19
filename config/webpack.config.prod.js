const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const getConfig = require('./webpack.config.common');

module.exports = (env, {mode}) => {
  return getConfig(mode, (_, baseConfig) => {
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
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
          filename: '[chunkFilename].css',
          chunkFilename: '[chunkFilename]-[id].css',
        }),
      ],
      stats: 'errors-only',
      devtool: 'nosources-source-map',
      optimization: {
        runtimeChunk: 'single',
        minimizer: [
          new TerserPlugin({
            parallel: true,
            terserOptions: {
              test: /\.js(\?.*)?$/i,
            }
          }),
        ],
      },
    });
  });
};
