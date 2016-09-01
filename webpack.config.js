
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const Webpack = require('webpack');
const Validator = require('webpack-validator');


module.exports = Validator({
  context: __dirname,
  entry: {
    app: './src/js/main.js',
    vendor: ['jquery', 'react', 'react-dom']
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.[name].js'
  },
  devtool: 'eval',
  devServer: {
    inline: true,
    port: 3333
  },
  watch: true,
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: [['es2015', {modules: false}], 'react']
        }
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      }
    ]
  },
  plugins: [
    new Webpack.optimize.CommonsChunkPlugin({
      name: "vendor"
    })
  ],
  postcss: [
    autoprefixer({
      browsers: ['last 2 versions']
    })

  ]
});
