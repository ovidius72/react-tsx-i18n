const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const ROOT = path.join(__dirname, '..');
const paths = {
  root: ROOT,
  src: path.join(ROOT, 'src'),
  public: path.join(ROOT, 'public'),
  build: path.join(ROOT, 'build'),
  entry: path.join(ROOT, 'src', 'index.tsx'),
  locale: path.join(ROOT, 'locale')
};
module.exports = {
    entry: paths.entry,
    output: { path: paths.build, filename: "index.bundle.js" },
    mode: process.env.NODE_ENV || "development",
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    devServer: { contentBase: paths.src, port: 9002 },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
            {
                test: /\.(css|scss)$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
                use: ["file-loader"],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
          filename: path.join(paths.build, 'index.html'),
          template: path.join(paths.public, 'index.html')
        }),
    ],
};
