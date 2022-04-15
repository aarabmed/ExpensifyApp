const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';


require('dotenv').config();


const htmlPlugin = new HtmlWebpackPlugin({
  template: './public/index.html',
  filename: "./index.html"
});

const miniCssPlugin = new MiniCssExtractPlugin(
  // chunk version for cache refresh
  // filename: 'style.[contentHash].css',
);

module.exports = (env) => {
  const isProduction = env === 'production';

  return {
    target:"web",
    entry: ['babel-polyfill', './src/app.js'],
    output: {
      path: path.resolve(__dirname, 'dist'),
      // hashing for cache refresh
      // filename: 'main.[chunkHash].js',
      filename: '[name].js',
      publicPath: "/"
    },
    module: {
    rules: [{
      loader: 'babel-loader',
      test: /\.(js|jsx)$/, 
      exclude: /node_modules/,
      },
      {test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader, 
          'css-loader', 
          'sass-loader'
        ]
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/,
        use: 'url-loader',
      }
      ,   
    
    ]
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(), // Tell webpack we want hot reloading
      htmlPlugin,
      miniCssPlugin,
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(process.env)      
      })
    ],
    
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    devServer: {

      port: 9000,
      compress: true,
      historyApiFallback: true,
    }
  };
};
