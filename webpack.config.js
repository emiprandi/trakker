'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var isDev = process.env.NODE_ENV !== "build";

var indexHtml = new HtmlWebpackPlugin({
  template: './app/index.html',
  hash: true
});

var cssModules = new ExtractTextPlugin('css/app.css', {
  allChunks: true
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
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      }, {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]')
      }, {
        test: /\.png$/,
        loader: 'url-loader?mimetype=image/png'
      }
    ]
  },
  plugins: isDev ? [indexHtml, cssModules] : [
    indexHtml,
    cssModules,
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
