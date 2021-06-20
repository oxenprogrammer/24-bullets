const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              ['@babel/plugin-transform-runtime'],
            ],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: [/\.vert$/, /\.frag$/],
        use: 'raw-loader',
      },
      {
        test: /\.(gif|png|jpe?g|svg|xml|mp3|aac|ogg|wav)$/i,
        use: 'file-loader',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      root: path.resolve(__dirname, '../'),
    }),
    new webpack.DefinePlugin({
      CANVAS_RENDERER: JSON.stringify(true),
      WEBGL_RENDERER: JSON.stringify(true),
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new HtmlWebpackTagsPlugin({
      metas: [{
        path: '../TitleScreen.png',
        attributes: {
          property: 'og:image',
          prefix: 'og: http://ogp.me/ns#',
        },
      }, {
        attributes: {
          property: 'og:image:type',
          content: 'image/png',
        },
      }, {
        attributes: {
          property: 'og:image:width',
          content: '500',
        },
      }, {
        attributes: {
          property: 'og:image:height',
          content: '500',
        },
      },
      {
        attributes: {
          property: 'og:url',
          content: 'http://emanuel-okello.me/24-bullets',
          prefix: 'og: http://ogp.me/ns#',
        },
      },
      {
        attributes: {
          property: 'og:type',
          content: 'content="text/html; charset=utf-8',
          prefix: 'og: http://ogp.me/ns#',
        },
      },
      {
        attributes: {
          property: 'og:title',
          content: '24 Bullets',
          prefix: 'og: http://ogp.me/ns#',
        },
      }],
    }),
  ],
};
