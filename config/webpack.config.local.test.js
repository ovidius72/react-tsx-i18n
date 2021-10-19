const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
// const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
// const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const envLoader = require('./envReader');
const cfg = require('./bundleConfig');

module.exports = (_, argv) => {
  const { mode } = argv;
  const envs = envLoader.getEnvs(mode);
  const { DEV_HOST, DEV_PORT, BASE_PATH, APP_NAME, APP_VERSION } = envs;
  console.log('BASE_PATH', BASE_PATH);
  console.log('envs', envs);
  console.log('cfg', cfg);
  const { paths } = cfg;
  console.log('paths', paths);
  return {
    mode,
    entry: { main: paths.entry },
    context: paths.root,
    output: {
      path: paths.build,
      filename: 'bundle.js',
      chunkFilename: '[name].js',
      globalObject: 'this',
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
        {
          test: /\.js$/,
          use: 'source-map-loader',
          enforce: 'pre',
          exclude: [
            path.join(process.cwd(), 'node_modules'),
            /build/,
            /locale/,
            /typings/,
            /__tests__/,
            /coverage/,
          ],
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg|mp3)$/,
          use: {
            loader: 'file-loader',
            options: {
              name: './images/[name]-[fullhash].[ext]',
            },
          },
        },
        {
          test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'fonts/',
              },
            },
          ],
        },
        {
          test: /\.(scss|sass)$/,
          use: [
            { loader: 'style-loader' },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
              },
            },
            { loader: 'sass-loader' },
          ],
        },
        {
          test: /\.css$/,
          use: [
            { loader: 'style-loader' },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
              },
            },
            { loader: 'postcss-loader' },
          ],
        },
        {
          test: /messages*\.(json)$/,
          use: ['json-loader'],
          include: paths.locale,
          type: 'javascript/auto',
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        // {
        //   test: /\.(ts|tsx)$/,
        //   enforce: 'pre',
        //   exclude: /node_modules/,
        //   loader: 'eslint-loader'
        // }
      ],
    },
    // stats: {
    //   assets: false,
    //   assetsSort: '!size',
    //   builtAt: false,
    //   moduleAssets: false,
    //   assetsSpace: 5,
    //   nestedModules: false,
    //   chacheModules: false,
    //   runtimeModule: false,
    //   dependentModule: false,
    //   cacheAssets: false,
    //   children: false,
    //   chunkGroups: false,
    //   chunkModules: false,
    //   colors: true,
    // },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      alias: {
        models: path.join(paths.src, 'models'),
        images: path.join(paths.src, 'images'),
        utils: path.join(paths.src, 'utils'),
        components: path.join(paths.src, 'components'),
        src: paths.src,
      },
    },
    plugins: [
      new webpack.DefinePlugin(envs),
      // new ForkTsCheckerWebpackPlugin({
      //   eslint: {
      //     files: ['./src/**/*.ts', './src/**/*.tsx']
      //   }
      // }),
      new ESLintPlugin({
        files: ['./src/**/*.ts', './src/**/*.tsx'],
      }),
      // new FaviconsWebpackPlugin({
      //   logo: path.join(paths.public, 'favicon.png'),
      //   prefix: 'favicons/[name]-[fullhash]',
      //   emitStats: true,
      //   persistentCache: false,
      //   inject: true,
      //   background: '#fff',
      //   title: `${APP_NAME}`
      // }),
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
      new HtmlWebPackPlugin({
        title: APP_NAME,
        // hash: true,
        filename: path.join(paths.build, 'index.html'),
        template: path.join(paths.public, 'index.html'),
      }),
    ],
    devtool: 'eval-cheap-source-map',
    devServer: {
      stats: 'errors-warnings',
      'hide-modules': true,
      // overlay: true,
      // quiet: false,
      // noInfo: true,
      contentBase: BASE_PATH,
      port: 3333,
      open: true,
      // hot: true,
      // historyApiFallback: true,
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
    // devtool: 'source-map',
    // optimization: {
    //   splitChunks: {
    //     cacheGroups: {
    //       default: {
    //         chunks: 'all',
    //         minChunks: 2,
    //         priority: -20,
    //         reuseExistingChunk: true,
    //         name: 'default'
    //       },
    //       // vendors: false,
    //       // vendor: {
    //       //   chunks: 'all',
    //       //   test: /[\\/]node_modules[\\/]/,
    //       //   enforce: true,
    //       //   name: 'vendor'
    //       // },
    //       // common chunk
    //       // common: {
    //       //   name: 'common',
    //       //   minChunks: 2,
    //       //   chunks: 'all',
    //       //   priority: 10,
    //       //   reuseExistingChunk: true,
    //       //   enforce: true
    //       // },
    //       styles: {
    //         minSize: 0, // Ignore minSize for CSS files, to force them in new chunks
    //         test: /\.css$/,
    //         name: 'style'
    //       }
    //     }
    //   }
    // }
  };
};
