
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const Webpack = require('webpack');
const Validator = require('webpack-validator');


module.exports = env => {

  return Validator({
    context: path.resolve('src'),
    entry: {
      app: './main.js',
      vendor: ['jquery', 'react', 'react-dom']
    },
    output: {
      path: path.resolve('build'),
      filename: 'bundle.[name].js',
      pathinfo: !env.prod
    },
    devtool: env.prod ? 'source-map' :'eval',
    bail: env.prod,
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
      new HtmlWebpackPlugin({
        template: './index.html'
      }),
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
}

//
//
// const {resolve} = require('path')
// const webpack = require('webpack')
// const ProgressBarPlugin = require('progress-bar-webpack-plugin')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin')
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
// const webpackValidator = require('webpack-validator')
// const {getIfUtils, removeEmpty} = require('webpack-config-utils')
// const OfflinePlugin = require('offline-plugin')
//
// module.exports = env => {
//   const {ifProd, ifNotProd} = getIfUtils(env)
//   const config = webpackValidator({
//     context: resolve('src'),
//     entry: {
//       app: './bootstrap.js',
//       vendor: ['todomvc-app-css/index.css'],
//     },
//     output: {
//       filename: ifProd('bundle.[name].[chunkhash].js', 'bundle.[name].js'),
//       path: resolve('dist'),
//       pathinfo: ifNotProd(),
//     },
//     devtool: ifProd('source-map', 'eval'),
//     module: {
//       loaders: [
//         {test: /\.js$/, loaders: ['babel'], exclude: /node_modules/},
//         {
//           test: /\.css$/,
//           loader: ExtractTextPlugin.extract({
//             fallbackLoader: 'style',
//             loader: 'css',
//           })
//         },
//       ],
//     },
//     plugins: removeEmpty([
//       new ProgressBarPlugin(),
//       new ExtractTextPlugin(ifProd('styles.[name].[chunkhash].css', 'styles.[name].css')),
//       ifProd(new InlineManifestWebpackPlugin()),
//       ifProd(new webpack.optimize.CommonsChunkPlugin({
//         names: ['vendor', 'manifest'],
//       })),
//       new HtmlWebpackPlugin({
//         template: './index.html',
//         inject: 'head',
//       }),
//       new OfflinePlugin(),
//       new webpack.DefinePlugin({
//         'process.env': {
//           NODE_ENV: ifProd('"production"', '"development"')
//         }
//       }),
//     ]),
//   })
//   if (env.debug) {
//     console.log(config)
//     debugger // eslint-disable-line
//   }
//   return config
// }
