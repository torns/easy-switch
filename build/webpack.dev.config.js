const { merge } = require('webpack-merge');
const webapckBaseConfig = require('./webpack.base.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
module.exports = merge(webapckBaseConfig, {
  mode: 'development',
  entry: {
    popup: path.resolve(__dirname, '../src/source/popup.ts'),
    option: path.resolve(__dirname, '../src/source/option.ts'),
    content: path.resolve(__dirname, '../src/libs/content.ts'),
    background: path.resolve(__dirname, '../src/libs/background.ts'),
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
      template: path.resolve(__dirname, './../src/views/option.html'),
      filename: '../views/option.html',
      chunks: ['option'],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './../src/views/background.html'),
      filename: '../views/background.html',
      chunks: ['background'],
    }),
    new CleanWebpackPlugin(),
  ],
});
