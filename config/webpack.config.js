const webpack = require('webpack');
const merge = require('webpack-merge');
// const WebpaclCleanTerminalPlugin = require('clean-terminal-webpack-plugin');
// const WebpackFriendlyErrors = require('friendly-errors-webpack-plugin');
// const WebpackBar = require('webpackbar');
const getConfig = require('./webpack.config.common');

module.exports = (env, { mode }) => {
  return getConfig(mode, ({ BASE_PATH, DEV_PORT, DEV_HOST, APP_NAME, APP_VERSION }, baseConfig) => {
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
      devtool: 'source-map',
      devServer: {
        overlay: true,
        // quiet: true,
        stats: {
          colors: true,
          hash: false,
          version: false,
          timings: false,
          assets: false,
          chunks: false,
          modules: false,
          reasons: false,
          children: false,
          source: false,
          errors: true,
          errorDetails: true,
          warnings: true,
          publicPath: false,
        },
        // noInfo: true,
        contentBase: BASE_PATH,
        port: DEV_PORT,
        host: DEV_HOST,
        open: true,
        hot: true,
        historyApiFallback: true,
        // progress: false,

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
        new webpack.HotModuleReplacementPlugin({
          log: false,
        }),

        // new WebpackBar({
        //   color: "orange",
        //   name: `${APP_NAME} v${APP_VERSION}`,
        //   compiledIn: false,
        // }),
        // new WebpackFriendlyErrors({
        //   compilationSuccessInfo: {
        //     messages: [`${APP_NAME} v${APP_VERSION} is running at http://${DEV_HOST}:${DEV_PORT}`],
        //   },
        //   clearConsole: true,
        // }),
        // new WebpaclCleanTerminalPlugin(),
      ],
    });
  });
};
