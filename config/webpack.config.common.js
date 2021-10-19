const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
// const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const envLoader = require('./envReader');

const ROOT = path.join(__dirname, '..');
const paths = {
  root: ROOT,
  src: path.join(ROOT, 'src'),
  public: path.join(ROOT, 'public'),
  build: path.join(ROOT, 'build'),
  entry: path.join(ROOT, 'src', 'index.tsx'),
  locale: path.join(ROOT, 'locale'),
};

const pathsToClean = ['build'];
const cleanConfig = {
  root: paths.root,
  verbose: true,
};

const config = (mode, cb) => {
  const envsObject = envLoader.asObject(true, mode);
  const isDev = mode === 'development';
  const { DEV_PORT, DEV_HOST, APP_NAME, APP_VERSION, BASE_PATH } = envsObject;

  const envs = Object.keys(envsObject).reduce((acc, curr) => {
    acc[`process.env.${curr}`] = JSON.stringify(envsObject[curr]);
    return acc;
  }, {});

  return cb(
    {
      mode,
      paths,
      DEV_PORT,
      DEV_HOST,
      APP_NAME,
      APP_VERSION,
      BASE_PATH,
      pathsToClean,
      cleanConfig,
      envs,
    },
    {
      mode,
      entry: paths.entry,
      context: paths.root,
      output: {
        path: paths.build,
        publicPath: BASE_PATH,
        filename: 'bundle-[name]-[fullhash].js',
        chunkFilename: 'chunk-[name]-[chunkhash].js',
        clean: true,
        // globalObject: 'this'
      },
      module: {
        rules: [
          {
            test: /\.(js|jsx|ts|tsx)$/,
            exclude: /node_modules/,
            use: [
              {
                loader: require.resolve('babel-loader'),
                options: {
                  plugins: [
                    isDev && require.resolve('react-refresh/babel'),
                  ].filter(Boolean),
                },
              },
            ],
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
          // {
          //   test: /\.(scss|sass)$/,
          //   use: [
          //     { loader: 'style-loader' },
          //     {
          //       loader: 'css-loader',
          //       options: {
          //         importLoaders: 1
          //       }
          //     },
          //     { loader: 'sass-loader' }
          //   ]
          // },
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
        ],
      },
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
        new ForkTsCheckerWebpackPlugin({
          eslint: {
            files: ['./src/**/*.ts', './src/**/*.tsx'],
          },
        }),
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
        new HtmlWebPackPlugin({
          title: APP_NAME,
          hash: true,
          filename: path.join(paths.build, 'index.html'),
          template: path.join(paths.public, 'index.html'),
        }),
      ],
      optimization: {
        splitChunks: {
          cacheGroups: {
            default: {
              chunks: 'all',
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
              name: 'default',
            },
            vendors: false,
            vendor: {
              chunks: 'all',
              test: /[\\/]node_modules[\\/]/,
              enforce: true,
              name: 'vendor',
            },
            // common chunk
            common: {
              name: 'common',
              minChunks: 2,
              chunks: 'all',
              priority: 10,
              reuseExistingChunk: true,
              enforce: true,
            },
            styles: {
              minSize: 0, // Ignore minSize for CSS files, to force them in new chunks
              test: /\.css$/,
              name: 'style',
            },
          },
        },
      },
    },
  );
};

module.exports = config;
