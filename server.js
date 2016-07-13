/**
 * Created by negin.basiri on 13/07/2016.
 */
var config = require("./webpack.config.js");
const webpack = require("webpack");
const webpackDevServer = require("webpack-dev-server");
config.entry.app.unshift("webpack-dev-server/client?http://localhost:8080/", "webpack/hot/dev-server");
var compiler = webpack(config);
var server = new webpackDevServer(compiler, {
  hot: true
});
server.listen(8080);
