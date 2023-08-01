const path = require("path");

module.exports = {
  mode: "development",
  // mode: "production",
  entry: "./src/app.ts",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    // publicPath: "dist",
  },
  devServer: {
    static: "./",
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
};
