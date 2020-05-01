//引入path模块
const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');

//导出一个配置文件模块
module.exports = {
    //环境
    mode: 'development',
    //目标文件
    entry: [path.join(__dirname, './src/index.js')],
    //自定义输出文件
    output: {
        path: path.join(__dirname, './dist'), //路径
        filename: 'app.js'  //文件名称
    },
    //webpack-dev-server 配置文件
    // devServer: {
    //     open: true,
    //     port: 8081,
    //     contentBase: './',
    //     hot: true,
    // },
    //插件
    plugins: [
        //HMR 插件 如果你使用 webpack-dev-server打包 并且后面跟上了 --hot 就等同于开启了这个插件
        // new webpack.HotModuleReplacementPlugin(),
        // 打包页面文件
        new htmlWebpackPlugin({
            //模板文件地址 也就是要打包的页面文件
            template: path.join(__dirname, './index.html'),
            //生成在内存中的文件名
            filename: 'index.html'
        })
    ],
    module: {
        rules: [
            //css
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            //less
            { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
            { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }
        ]
    }
}