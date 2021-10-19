const webpack = require('webpack');
const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const getConfig = require('./webpack.config.common');

module.exports = (env, { mode }) => {
  return getConfig(mode, (options, baseConfig) => {
    return merge(baseConfig, {
      module: {
        rules: [
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
          },
        ],
      },
      plugins: [new webpack.HotModuleReplacementPlugin()],
      devtool: 'cheap-module-source-map',
      optimization: {
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
