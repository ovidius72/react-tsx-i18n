const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
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
      devtool: 'inline-cheap-module-source-map',
      optimization: {
        minimizer: [
          new UglifyJSPlugin({
            test: /\.js($|\?)/i,
          }),
        ],
      },
    });
  });
};
