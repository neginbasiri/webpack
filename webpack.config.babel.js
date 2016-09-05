
const Autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Path= require('path');
const Webpack = require('webpack');
const Validator = require('webpack-validator');


module.exports = env => {

  const addPlugin = (add, plugin) => add ? plugin : undefined;
  const ifProd = plugin => addPlugin(env.prod, plugin);
  const removeEmpty = array => array.filter(i => !!i);

  const config = Validator({
    context: Path.resolve('src'),
    entry: {
      app: './main.js',
      vendor: ['jquery', 'react', 'react-dom']
    },
    output: {
      path: Path.resolve('build'),
      filename: 'bundle.[name].js',
      pathinfo: !env.prod
    },
    devtool: env.prod ? 'source-map' : 'eval',
    bail: env.prod,
    devServer: {
      inline: true,
      port: 3333
    },
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
    plugins:  removeEmpty([
      new HtmlWebpackPlugin({
        template: './index.html'
      }),
      // doesn't save anything in this small app. npm@3 mostly takes care of this
      ifProd(new Webpack.optimize.DedupePlugin()),
      ifProd(new Webpack.optimize.CommonsChunkPlugin({
        names: ['vendor'],
      })),
      // saves a couple of kBs
      ifProd(new Webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
        quiet: true,
      })),
      ifProd(new Webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"',
        }
      }))
    ]),
    postcss: [
      Autoprefixer({
        browsers: ['last 2 versions']
      })

    ]
  });

  if (env.debug) {
    console.log(config)
    debugger // eslint-disable-line
  }

  return config;
}

