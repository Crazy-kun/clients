const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    entry: {
        app: ["./frontend/index.tsx", "webpack-hot-middleware/client"],
        vendor: ["react", "react-dom"]
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "js/[name].bundle.js"
    },
    devtool: "source-map",
    resolve: {
        extensions: [".js", ".jsx", ".json", ".ts", ".tsx", ".css"]
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                loader: "ts-loader"
            },
            {
                enforce: "pre",
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "source-map-loader"
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "frontend", "index.html")
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
};
