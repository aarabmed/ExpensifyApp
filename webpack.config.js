const path = require('path');
const {DefinePlugin,HashedModuleIdsPlugin,HotModuleReplacementPlugin} = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');


process.env.NODE_ENV = process.env.NODE_ENV || 'development';


require('dotenv').config();


const htmlPlugin = new HtmlWebpackPlugin({
  template: './public/index.html',
  filename: "./index.html",
  favicon: "./public/images/favicon.ico"
});

const miniCssPlugin = new MiniCssExtractPlugin(
  // chunk version for cache refresh
  // filename: 'style.[contentHash].css',
);

module.exports = (env) => {
  const isProduction = env === 'production';
  if(isProduction){
    return {
      target:"web",
      mode:"production",
      entry: ['babel-polyfill', './src/app.js'],
      output: {
        path: path.resolve(process.cwd(), 'dist'),
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].chunk.js',
        publicPath: "/"
      },
      optimization: {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              warnings: false,
              compress: {
                comparisons: false,
              },
              parse: {},
              mangle: true,
              output: {
                comments: false,
                ascii_only: true,
              },
            },
            parallel: true,
            cache: true,
            sourceMap: true,
          }),
        ],
        nodeEnv: 'production',
        sideEffects: true,
        concatenateModules: true,
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: 10,
          minSize: 0,
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name(module) {
                const packageName = module.context.match(
                  /[\\/]node_modules[\\/](.*?)([\\/]|$)/,
                )[1];
                return `npm.${packageName.replace('@', '')}`;
              },
            },
          },
        },
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
        new HtmlWebpackPlugin({
          template: './public/index.html',
          minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
          },
          inject: true,
        }),
        new OfflinePlugin({
          relativePaths: false,
          publicPath: '/',
          appShell: '/',
    
          // No need to cache .htaccess. See http://mxs.is/googmp,
          // this is applied before any match in `caches` section
          excludes: ['.htaccess'],
    
          caches: {
            main: [':rest:'],
    
            // All chunks marked as `additional`, loaded after main section
            // and do not prevent SW to install. Change to `optional` if
            // do not want them to be preloaded at all (cached only when first loaded)
            additional: ['*.chunk.js'],
          },
    
          // Removes warning for about `additional` section usage
          safeToUseOptionalCaches: true,
        }),
        new CompressionPlugin({
          algorithm: 'gzip',
          test: /\.js$|\.css$|\.html$/,
          threshold: 10240,
          minRatio: 0.8,
        }),
       /*  new WebpackPwaManifest({
          name: 'React Boilerplate',
          short_name: 'React BP',
          description: 'My React Boilerplate-based project!',
          background_color: '#fafafa',
          theme_color: '#b1624d',
          inject: true,
          ios: true,
          icons: [
            {
              src: path.resolve('public/images/icon-512x512.png'),
              sizes: [72, 96, 128, 144, 192, 384, 512],
            },
            {
              src: path.resolve('app/images/icon-512x512.png'),
              sizes: [120, 152, 167, 180],
              ios: true,
            },
          ],
        }), */
        new HashedModuleIdsPlugin({
          hashFunction: 'sha256',
          hashDigest: 'hex',
          hashDigestLength: 20,
        }),
        miniCssPlugin,
        new DefinePlugin({
          'process.env': JSON.stringify(process.env)      
        })
      ],
      performance: {
        assetFilter: assetFilename =>
          !/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename),
      },
      devtool: isProduction ? 'source-map' : 'inline-source-map',
    }
  }else{
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
        new HotModuleReplacementPlugin(), // Tell webpack we want hot reloading
        htmlPlugin,
        miniCssPlugin,
        new DefinePlugin({
          'process.env': JSON.stringify(process.env)      
        })
      ],
      
      devtool: isProduction ? 'source-map' : 'inline-source-map',
      devServer: {

        port: 9000,
        compress: true,
        historyApiFallback: true,
        }
    }
  }
};
