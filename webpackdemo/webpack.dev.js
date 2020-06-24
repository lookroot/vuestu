const merge = require("webpack-merge");
const common = require("./webpack.common")
const path = require('path');
module.exports = merge(common, {
    mode: 'development',
    devtool: 'eval',
    devServer: {
        stats: "errors-only",
        host: process.env.HOST,
        port: process.env.PORT,
        open: true,
        hot: true
    },

    //模块规则
    module: {
        rules: [

            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.js$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                include: [path.resolve(__dirname, 'src')],
                options: {
                    formatter: require('eslint-friendly-formatter')
                }
            },
            {
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                }]
            }
        ]
    }
})