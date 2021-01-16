const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');


module.exports = {
  entry: path.join(__dirname,'./src/main.js'),
  output: {
    path: path.join(__dirname,'./dist'),
    filename: 'bundle.js'
  },
  plugins:[
    new htmlWebpackPlugin({
      template: path.join(__dirname,'./src/index.html'),
      filename: 'index.html'
    }),
    new VueLoaderPlugin()
  ],
  module:{
    rules:[
      {test: /\.css$/, use: ['style-loader','css-loader']},
      {test: /\.js$/, use: 'babel-loader', exclude: /node_modules/},
      {test: /\.vue$/, loader: 'vue-loader'},
      {test: /\.(jpg|png|gif|bmp|jpeg)$/,use: 'url-loader?limit=8908&name=[hash:8]-[name].[ext]'},
      {test: /\.(ttf|eot|svg|woff|woff2)$/,use: 'url-loader'},
      {test: /\.scss$/, use: ['style-loader','css-loader','sass-loader']},
    ]
  }
}