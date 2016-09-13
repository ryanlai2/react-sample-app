var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  devServer: {
    headers: { 'Access-Control-Allow-Origin': '*' },
    headers: { 'Access-Control-Allow-Headers': 'X-Requested-With' }
  },
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:3000', // WebpackDevServer host and port
    'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
    './src/index' // Your appʼs entry point
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: 'build/'
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEVELOPMENT__: true,
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      Promise: 'imports?this=>global!exports?global.Promise!es6-promise',
      fetch: 'imports?this=>global!exports?global.fetch!isomorphic-fetch'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
          warnings: false
      }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: [
          'react-hot',
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
