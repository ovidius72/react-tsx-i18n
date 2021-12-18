const { merge } = require('webpack-merge');
const chalk = require('chalk');
// const webpack = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { networkInterfaces } = require('os');

const WebpaclCleanTerminalPlugin = require('clean-terminal-webpack-plugin');
const WebpackBar = require('webpackbar');
const getConfig = require('./webpack.config.common');
const package = require('../package.json');
const APP_VERSION = package.version;
const APP_NAME = package.name;

const getLocalExternalIP = () =>
  []
    .concat(...Object.values(networkInterfaces()))
    .filter(details => details.family === 'IPv4' && !details.internal)
    .pop().address;

const ip = getLocalExternalIP();

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
        infrastructureLogging: {
          level: 'warn',
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
              warnings: false,
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

          new WebpaclCleanTerminalPlugin(),
          new WebpackBar({
            color: 'cyan',
            profile: true,
            reporters: ['fancy', MyReporter(DEV_HOST, DEV_PORT)],
            name: `${APP_NAME} v${APP_VERSION}`,
            compiledIn: false,
          }),
        ],
      });
    },
  );
  return newConfig;
};

let compiled = false;
const MyReporter = (host, port) => ({
  // start (context) {
  //   consola.info(`Compiling ${context.state.name}`)
  // },
  // change (context, { shortPath }) {
  //   consola.debug(`${shortPath} changed.`, `Rebuilding ${context.state.name}`)
  // },
  // done (context) {
  //   const { hasError, message, name } = context.state
  //   consola[hasError ? 'error' : 'success'](`${name}: ${message}`)
  // },
  done() {
    const parsedHost =
      host === '0.0.0.0' || host === 'localhost' ? 'localhost' : host;
    const localText = chalk.cyanBright.bold(
      ` - Local:   http://${parsedHost}:${port}`,
    );
    const local = '🎸' + localText;
    const networkText = chalk.yellowBright.bold(
      ` - Network: http://${ip}:8080`,
    );
    const network = '🚀' + networkText;
    const len = Math.max(localText.length, networkText.length);
    const dashes = new Array(len - 15).fill('-').join('');

    if (!compiled) {
      console.log(chalk.green.bold('✅ Server started!'));
      console.log();
      console.log(chalk.cyanBright.bold('App running at:'));
      console.log(chalk.greenBright(dashes));
      console.log(local);
      console.log(network);
      console.log(chalk.greenBright(dashes));
      console.log(chalk.magenta('Press CTRL-c to stop'));
      console.log();
    } else {
      console.log(local);
      console.log(network);
      console.log(chalk.magenta('Press CTRL-c to stop'));
      console.log();
    }
    compiled = true;
  },
});
