const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
module.exports = (env, argv) => {
  const { mode } = argv;
  const isProduction = mode === "production";
  return {
    entry: "./src/App.tsx",
    output: {
      filename: isProduction ? "[name].[contenthash].js" : "main.js",
      publicPath: "/",
      path: path.resolve(__dirname, "build"),
    },
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
    module: {
      rules: [
        {
          test: /\.(js|ts)x?$/,
          exclude: /node_modules/,
          loader: "babel-loader",
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
      }),
    ],

    devServer: {
      static: path.join(__dirname, "public"),
      historyApiFallback: true,
      host: "localhost",
      port: 3000,
      compress: true,
      open: true,
      hot: true,
    },
    devtool: "source-map",
  };
};
