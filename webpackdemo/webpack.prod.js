const merge = require("webpack-merge");
const common = require("./webpack.common")
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = merge(common, {
    mode: 'production',
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles/[name].css'
        })
    ],
    module: {
        rules: [

            // {
            //     test: /\.css$/,
            //     use: ['style-loader', 'css-loader']
            // },
            // {
            //     test: /\.less$/,
            //     use: ['style-loader', 'css-loader', 'less-loader']
            // }
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, 'css-loader'
                ]
            }
        ]
    }
})