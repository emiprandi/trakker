'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var isDev = process.env.NODE_ENV !== "build";

var indexHtml = new HtmlWebpackPlugin({
  template: './app/index.html',
  hash: true
});

module.exports = {
  entry: './app/app.js',
  target: 'electron-renderer',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'assets/app.js'
  },
  devtool: isDev ? 'inline-sourcemap' : null,
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel', query: { presets: ['es2015', 'react'] } }
    ]
  },
  plugins: isDev ? [indexHtml] : [
    indexHtml,
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      mangle: true,
      sourcemap: false,
      beautify: false,
      dead_code: true
    })
  ]
};
