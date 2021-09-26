const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const WebpackBarPlugin = require('webpackbar');
const autoprefixer = require('autoprefixer');
const copyResources = [
  {
    from: path.resolve(__dirname, path.join('../src/manifest.json')),
    to: `${path.resolve('dist')}/manifest.json`,
  },
  {
    from: path.resolve(__dirname, path.join('../src/assets')),
    to: `${path.resolve('dist')}/assets`,
  },
  {
    from: path.resolve(__dirname, path.join('../src/libs/plugin/hot-reload.js')),
    to: `${path.resolve('dist')}/libs/plugin/hot-reload.js`,
  },
];
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              loaders: {
                ts: 'ts-loader',
              },
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              appendTsSuffixTo: [/\.vue$/],
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['css-loader', 'postcss-loader'],
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [autoprefixer],
              },
            },
          },
          'less-loader',
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': path.join(__dirname, '../src'),
    },
  },
  plugins: [
    new WebpackBarPlugin(),
    new CopyPlugin({
      patterns: copyResources,
    }),
    new VueLoaderPlugin(),
  ],
  stats: 'errors-only',
};
