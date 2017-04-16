var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

const webpack = require('webpack');
const { resolve } = require('path');

module.exports = {
  context: resolve(__dirname, 'src'),
    entry: [
    'react-hot-loader/patch',
    // activate HMR for React

    'webpack-dev-server/client?http://localhost:8080',
    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint

    'webpack/hot/only-dev-server',
    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates

    './index.js'
    // the entry point of our app
  ],

  output: {
    filename: 'bundle.js',
    // the output bundle

    path: resolve(__dirname, 'dist'),

    publicPath: '/'
    // necessary for HMR to know where to load the hot update chunks
  },

  devtool: 'inline-source-map',

  module: {
    rules: [
            {
                test: /\.jsx?$/,
                use: [ 'babel-loader', ],
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader','sass-loader'],
                    publicPath: '/dist'
                })
            },
           {
              test: /\.js$/,
              exclude: /node_modules/,
              use: 'babel-loader'
            }
        ]
            },


    devServer: {
        contentBase: resolve(__dirname, "dist"),
        compress: true,
        stats: "errors-only",
        open: true,
        hot: true,
        publicPath: '/'
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'Project Demo',
            // minify: {
            //     collapseWhitespace: true
            // },
            hash: true,
            template: 'index.html', // Load a custom template (ejs by default see the FAQ for details)
        }),
        new ExtractTextPlugin({
            filename: 'app.css',
            disable: false,
            allChunks: true
        }),
        new webpack.HotModuleReplacementPlugin(),
        // enable HMR globally

        new webpack.NamedModulesPlugin()
        // prints more readable module names in the browser console on HMR updates
    ]
}
