import * as path from "path";
import * as webpack from "webpack";
import webpackNodeExternals = require("webpack-node-externals");

const config: webpack.Configuration = {
  entry: "./src/index.ts",
  mode: "development",
  target: "node",
  externals: [webpackNodeExternals()],
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "lambda/custom"),
    library: "index",
    libraryTarget: "commonjs2"
  }
};

export default config;
