const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
module.exports = (env, argv) => {
  const { mode } = argv;
  const isProduction = mode === "production";
  return {
    entry: {
      main: "./src/App.tsx",
      podcast: "./src/routes/Podcasts.tsx",
      podcastDetails: "./src/routes/PodcastDetails.tsx",
      episode: "./src/routes/Episode.tsx",
    },
    output: {
      filename: isProduction ? "[name].[contenthash].js" : "[name].js",
      publicPath: "/",
      path: path.resolve(__dirname, "build"),
    },
    optimization: {
      moduleIds: "deterministic",
      runtimeChunk: "single",
      splitChunks: {
        chunks: "all",
      },
    },
    performance: {
      hints: false,
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
      port: 3000,
      compress: true,
      open: true,
      hot: true,
    },
    devtool: "source-map",
  };
};
