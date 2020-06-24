const path = require('path');
const webpack = require("webpack")
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')
module.exports = {
    entry: {
        index: path.resolve(__dirname, './src/index.js'),

    },
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, 'dist'),
        // publicPath: "https://www.lookroot.cn/img"
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.NamedModulesPlugin(),
        new HtmlWebpackPlugin({
            title: "webpack init"
        })
    ],
    module: {
        rules: [{
            test: /\.(png|svg|jpg|gif)$/,
            use: {
                loader: 'url-loader',
                options: {
                    //超过这个大小，图片就打包为图片，不超过就打包为base64格式的代码
                    limit: 5000,
                    //打包文件名
                    name: "img/[hash].[ext]",
                },
            }
        }, ]
    }
}