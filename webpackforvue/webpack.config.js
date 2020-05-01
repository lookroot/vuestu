//引入path模块
const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
//导出一个配置文件模块
module.exports = {
    //环境
    mode: 'development',
    //目标文件
    entry: [path.join(__dirname, './src/main.js')],
    //自定义输出文件
    output: {
        path: path.join(__dirname, './dist'), //路径
        filename: 'app.js'  //文件名称
    },
    //插件
    plugins: [
        //HMR 插件 如果你使用 webpack-dev-server打包 并且后面跟上了 --hot 就等同于开启了这个插件
        // new webpack.HotModuleReplacementPlugin(),
        // 打包页面文件
        new htmlWebpackPlugin({
            //模板文件地址 也就是要打包的页面文件
            template: path.join(__dirname, './public/index.html'),
            //生成在内存中的文件名
            filename: 'index.html',
            title: '我的第一个vue程序'
        }),
        new VueLoaderPlugin()
    ],
    module: {
        rules: [
            //css
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            //less
            { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
            //babel转化
            { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
            // 处理.vue文件
            { test: /\.vue$/, use: 'vue-loader' }
        ]
    },
    resolve: {
        alias: {
            "vue$": 'vue/dist/vue.js'
        }
    }
}