const { merge } = require('webpack-merge');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const webpack = require('webpack');

const WebpaclCleanTerminalPlugin = require('clean-terminal-webpack-plugin');
// const WebpackFriendlyErrors = require('friendly-errors-webpack-plugin');
const WebpackBar = require('webpackbar');
const getConfig = require('./webpack.config.common');
module.exports = (env, { mode }) => {
  const newConfig = getConfig(
    mode,
    ({ BASE_PATH, DEV_PORT, DEV_HOST, APP_NAME, APP_VERSION }, baseConfig) => {
      return merge(baseConfig, {
        mode,
        module: {
          rules: [
            {
              test: /\.css$/,
              use: ['style-loader', 'css-loader']
            }
          ]
        },
        devtool: 'source-map',
        devServer: {
          port: DEV_PORT,
          host: DEV_HOST,
          open: true,
          // liveReload: true,
          hot: true,
          headers: () => ({'x-custom': ['key1=value', 'key2=value2']}),
          historyApiFallback: true,
          static: BASE_PATH,
          client: {
            // progress: false,
            overlay: {
              warnings: true,
              errors: true,
            }
          },
          // quiet: false,
          // stats: {
          //   colors: true,
          //   hash: false,
          //   version: false,
          //   timings: false,
          //   assets: false,
          //   chunks: false,
          //   modules: false,
          //   reasons: false,
          //   children: false,
          //   source: false,
          //   errorDetails: true,
          //   publicPath: false
          // },
          // noInfo: true,

          //* UNCOMMENT TO ENABLE PROXY *//
          // proxy: {
          //   '/api/*': {
          //     target: 'http://my-proxied-host/',
          //     changeOrigin: true,
          //     cookieDomainRewrite: 'localhost',
          //     secure: false,
          //     debug: true,
          //     preserveHeaderKeyCase: true,
          //     pathRewrite: { '^/api': '' },
          //   },
          // },
        },
        plugins: [
          // new webpack.HotModuleReplacementPlugin({
          //   log: false
          // }),
          new ReactRefreshWebpackPlugin(),
          new webpack.ProgressPlugin({ percentBy: 'entries' }),

          new WebpackBar({
            color: "orange",
            name: `${APP_NAME} v${APP_VERSION}`,
            compiledIn: false,
          }),
          // new WebpackFriendlyErrors({
          //   compilationSuccessInfo: {
          //     messages: [`${APP_NAME} v${APP_VERSION} is running at http://${DEV_HOST}:${DEV_PORT}`],
          //   },
          //   clearConsole: true,
          // }),
          new WebpaclCleanTerminalPlugin(),
        ]
      });
    }
  );
  return newConfig;
};
