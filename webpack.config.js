'use strict';

var webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    path = require('path'),
    srcPath = path.join(__dirname, 'src');

var isProduction = function () {
  return process.env.NODE_ENV === 'production';
};

module.exports = {
  target: 'web',
  cache: true,
  entry: {
    app: path.join(srcPath, 'app.jsx')
  },
  output: {
    path: path.join(__dirname, 'tmp'),
    publicPath: '',
    filename: '[name].js',
    pathInfo: true
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.sass', '.scss'],
    modulesDirectories: ['node_modules', 'src']
  },
  externals: {
    jsdom: 'jsdom' // fix fhir-client error
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel?cacheDirectory'
      },
      {
        test: /\.s(a|c)ss$/,
        loader: ExtractTextPlugin.extract('style', 'css!sass')
      },
      {
        test: /\.(jpg|png)$/,
        loader: 'url?limit=5000'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: 'src/index.html'
    }),
    new ExtractTextPlugin('[name].css'),
    new webpack.NoErrorsPlugin()
  ],

  debug: !isProduction(),
  devtool: !isProduction() ? 'cheap-module-source-map' : '',
  devServer: {
    contentBase: './tmp',
    historyApiFallback: true
  }
};
