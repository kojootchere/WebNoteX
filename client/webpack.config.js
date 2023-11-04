const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].bundle.js',
      publicPath: './'
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'index.html'),
        favicon: './favicon.ico',
        inject: 'head',
      }),
      new WebpackPwaManifest({
        name: 'Offline Text Editor',
        short_name: 'Offline Text Editor',
        description: 'Offline Text Editor!',
        background_color: '#ffffff',
        crossorigin: 'use-credentials',
        icons: [
          {
            src: path.resolve(__dirname, 'src/images/android-chrome-512x512.png'),
            sizes: '512x512',
            type: 'image/png',
          }
        ],
      }),
      new InjectManifest({
        swSrc: './src-sw.js'
      })
    ],
    module: {
      rules: [
        {
          test: /\.?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
      ],
    },
  };
};
