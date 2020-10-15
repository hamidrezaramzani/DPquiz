const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "app.js",
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [
            { test: /\.css$/i, use: ['style-loader', 'css-loader'] },
            { test: /\.html$/i, use: 'html-loader' },
            { test: /\.(png|jpe?g|gif|otf|ttf|woff|woff2|eot|ttf|svg)$/i, use: 'file-loader' }
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, "dist"),
        port: 4000
    },
    plugins: [
        new htmlWebpackPlugin({ title: 'DP Quiz', template: './src/index.html' }),
        new CleanWebpackPlugin()
    ]

};