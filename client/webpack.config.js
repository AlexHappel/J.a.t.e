const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = (env, argv) => {
  const mode = argv.mode || 'development';

  return {
    mode: mode,
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true, // Ensures that the output directory is cleaned before each build
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'J.A.T.E',
      }),
      new WebpackPwaManifest({
        fingerprints: false, // Prevents hashing in filenames
        inject: true, // Injects the manifest into the HTML
        name: 'Just Another Text Editor',
        short_name: 'J.A.T.E',
        description: 'A simple text editor PWA!',
        background_color: '#272822',
        theme_color: '#31a9e1',
        start_url: './',
        publicPath: './',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
      new InjectManifest({
        swSrc: './src-sw.js', // Source of your custom service worker
        swDest: 'src-sw.js', // Destination in the output directory
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'], // Handles CSS files
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'], // Transpiles modern JS for older environments
              plugins: ['@babel/plugin-transform-runtime'], // Avoids code duplication
            },
          },
        },
      ],
    },
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'), 
      },
      compress: true, 
      port: 8080, 
      hot: true, 
      historyApiFallback: true, 
    },
  };
};










