const { merge } = require('webpack-merge');
// const webpack = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

// const WebpaclCleanTerminalPlugin = require('clean-terminal-webpack-plugin');
// const WebpackBar = require('webpackbar');
const getConfig = require('./webpack.config.common');
module.exports = (env, { mode }) => {
  const newConfig = getConfig(
    mode,
    ({ BASE_PATH, DEV_PORT, DEV_HOST }, baseConfig) => {
      return merge(baseConfig, {
        mode,
        module: {
          rules: [
            {
              test: /\.css$/,
              use: ['style-loader', 'css-loader'],
            },
          ],
        },
        // devtool: 'source-map',
        // devtool: 'eval-source-map',
        devtool: 'cheap-module-source-map',
        stats: {
          ids: false,
          assets: false,
          modules: false,
          assetsSort: '!size',
          performance: false,
          builtAt: false,
          moduleAssets: false,
          assetsSpace: 5,
          nestedModules: false,
          cachedModules: false,
          runtimeModules: false,
          dependentModules: false,
          orphanModules: false,
          entrypoints: false,
          reasons: false,
          hash: false,
          chunkGroupAuxiliary: false,
          chunkGroupChildren: false,
          logging: 'error',
          cachedAssets: false,
          children: false,
          chunkGroups: false,
          chunkModules: false,
          colors: true,
        },
        devServer: {
          port: DEV_PORT,
          host: DEV_HOST,
          open: true,
          // liveReload: true,
          hot: true,
          // headers: () => ({ 'x-webpack-template': 'react-tsx-i18n' }),
          historyApiFallback: true,
          static: { directory: BASE_PATH },
          client: {
            progress: false,
            overlay: {
              warnings: true,
              errors: true,
            },
          },
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
          new ReactRefreshWebpackPlugin(),
          // new webpak.HotModuleReplacementPlugin({
          //   log: true
          // }),
          // new webpack.ProgressPlugin({ percentBy: 'entries' }),

          // new WebpackBar({
          //   color: 'cyan',
          //   name: `${APP_NAME} v${APP_VERSION}`,
          //   compiledIn: false,
          // }),
          // new WebpaclCleanTerminalPlugin(),
        ],
      });
    },
  );
  return newConfig;
};
