const path = require("path");

module.exports = {
  entry: "./src/Preview/preview.tsx",
  mode: "development",
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
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "preview", "dist"),
  },
  devServer: {
    port: 3000,
    static: {
      directory: path.join(__dirname, "preview"),
    },
    hot: true,
    watchFiles: ["src/**.{ts,tsx}"],
  },
};
