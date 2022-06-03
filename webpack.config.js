const webpack = require("webpack")
const path = require("path")
const htmlWebpackPlugin = require("html-webpack-plugin")
const {CleanWebpackPlugin} = require("clean-webpack-plugin")

const plugins = [
    new htmlWebpackPlugin({
        title: "Webpack introduction",
        template: path.resolve(__dirname, "./src/index.html"),
        filename: "index.html"
    }),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin()
]

module.exports = {
    mode: "development",
    devServer: {
        historyApiFallback: true,
        static: path.resolve(__dirname, "./dist"),
        open: true,
        compress: true,
        hot: true,
        port: 8080
    },
    plugins,
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "[name].bundle.js"
    },

    module: {
        rules: [
            { // JavaScript
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            { // Images
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: "asset/resource"
            },
            { // Шрифты и svg
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: "asset/inline"
            },
            { // Стили CSS, PostCSS, Sass
                test: /\.(scss|css)$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
            }
        ]
    }
}