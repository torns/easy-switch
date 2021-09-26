const { merge } = require('webpack-merge');
const webapckBaseConfig = require('./webpack.base.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
module.exports = merge(webapckBaseConfig, {
  mode: 'development',
  entry: {
    background: path.resolve(__dirname, '../src/libs/background.ts'),
    popup: path.resolve(__dirname, '../src/popup/index.ts'),
    options: path.resolve(__dirname, '../src/libs/options.ts'),
    content: path.resolve(__dirname, '../src/libs/content.ts'),
  }, // 入口文件
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist/libs/script'),
    libraryTarget: 'umd', //类库加载方式
    umdNamedDefine: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './../src/views/popup.html'),
      filename: '../views/popup.html',
      chunks: ['popup'],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './../src/views/background.html'),
      filename: '../views/background.html',
      chunks: ['background'],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './../src/views/options.html'),
      filename: '../views/options.html',
      chunks: ['options'],
    }),
    new CleanWebpackPlugin(),
  ],
});
