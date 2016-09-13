var path = require('path');
var webpack = require('webpack');

module.exports = {
  // devtool: 'cheap-module-source-map',
  entry: [
    './src/index' // Your appʼs entry point
  ],
  output: {
    path: path.join(__dirname, '../build'),
    filename: 'bundle.js',
    publicPath: 'build/'
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEVELOPMENT__: false,
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.ProvidePlugin({
      Promise: 'imports?this=>global!exports?global.Promise!es6-promise',
      fetch: 'imports?this=>global!exports?global.fetch!isomorphic-fetch'
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      mangle: false,
      sourceMap: false,
      output: {
        ascii_only: true
      },
      compressor: {
        warnings: false
      }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: [
          'babel',
        ],
        include: path.join(__dirname, '../src')
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
    ]
  }
}
