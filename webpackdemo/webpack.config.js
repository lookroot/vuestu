const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require("webpack")
module.exports = {
    //当前环境 开发环境 development 生产环境 production
    mode: "development",
    //source map 模式
    devtool: "cheap-module-eval-source-map",
    //webpack-dev-server 配置文件
    devServer: {
        //日志模式
        /**
         * 日志模式  friendly-errors-webpack-plugin 插件可以优化输出
         * errors-only  只在发生错误时触发
         * minimal 只在发生错误或者有新的编译时输出
         * none 没有输出
         * normal 标准输出
         * verbose 全部输出
         */
        stats: "errors-only",
        host: process.env.HOST,
        port: process.env.PORT,
        open: true,
        hot: true
    },
    // 多个 目标文件
    entry: {
        index: path.resolve(__dirname, './src/index.js'),
        other: path.resolve(__dirname, './src/other.js')
    },
    //输出文件
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js'
    },
    //插件
    plugins: [
        //使用插件 
        new HtmlWebpackPlugin({
            filename: "index.html",
            title: "webpack demo",
            chunks: ['index']
        }),
        new HtmlWebpackPlugin({
            filename: "other.html",
            title: "webpack demo",
            chunks: ['other']
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ],
    //模块规则
    module: {

    }
}