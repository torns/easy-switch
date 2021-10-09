const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const WebpackBarPlugin = require('webpackbar');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
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
    from: path.resolve(__dirname, path.join('../src/style')),
    to: `${path.resolve('dist')}/libs/style`,
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
        use: [
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [autoprefixer],
              },
            },
          },
        ],
        exclude: /node_modules/,
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
        test: /\.(png|jpg|jpeg|gif|eot|svg|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: '/assets',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': path.join(__dirname, '../src'),
      process: 'process/browser',
    },
  },
  plugins: [
    new WebpackBarPlugin(),
    new CopyPlugin({
      patterns: copyResources,
    }),
    new VueLoaderPlugin(),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
  stats: 'errors-only',
};
