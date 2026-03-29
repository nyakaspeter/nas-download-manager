const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, argv) => {
  const isProd = argv.mode === "production";

  return {
    entry: {
      "background/index": "./src/background/index.ts",
      "popup/index": "./src/popup/index.tsx",
      "settings/index": "./src/settings/index.tsx",
      "content/index": "./src/content/index.ts",
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[name].js",
      clean: true,
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: {
            loader: "ts-loader",
            options: {
              compilerOptions: {
                declaration: false,
                sourceMap: false,
              },
            },
          },
          exclude: /node_modules/,
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            {
              loader: "sass-loader",
              options: {
                sassOptions: {
                  includePaths: [path.resolve(__dirname, "scss")],
                },
              },
            },
          ],
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name].css",
      }),
    ],
    devtool: isProd ? false : "cheap-module-source-map",
    optimization: {
      // Don't split chunks — each entry must be self-contained for the extension
      splitChunks: false,
    },
  };
};
