const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");
const CssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');

module.exports = merge(common, {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    assetModuleFilename: 'static/images/[name]-[hash][ext]'
  },
  plugins: [
    new CssExtractPlugin({
      filename: "[name]-[contenthash].css"
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV' : JSON.stringify('production'),
      'process.env.APP_VERSION' : JSON.stringify('1.0.0')
    }),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [CssExtractPlugin.loader, "css-loader", "sass-loader"]
      },
      {
        test: /\.css$/,
        use: [CssExtractPlugin.loader, "css-loader"]
      }
    ]
  }
});
