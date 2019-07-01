const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const config = {
    mode: "development",
    devtool: 'cheap-module-eval-source-map',  // 开发环境使用
    // devtool: 'cheap-module-source-map', // 线上不需要使用sourceMap，但是如果也想在线上出错的时候提示具体错误，可以使用这个
    entry: {
        "main": path.resolve(__dirname, 'src/index.js')
    },
    devServer: {
        contentBase: './dist',
        open: true,
        hot: true,
        hotOnly: true   // 如果不设置，html出错的时候会刷新页面，设置为true，html出错也不会刷新页面
    },
    output: {
        publicPath: './',
        path: path.resolve(__dirname, 'dist'),
        filename: '[name]_[hash:8].js'
    },
    resolve: {
        alias: {
            jspath: path.resolve(__dirname, '/src/js/'),
            csspath: path.resolve(__dirname, '/src/css/'),
            rootPath: path.resolve(__dirname, '/src/'),
            componentsPath: path.resolve(__dirname, '/src/components/'),
        },
        extensions: ['.js', '.vue', '.json']
    },
    module: {
        rules: [
            {
                test: /\.(jpg|png|gif|jpeg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: '[name]_[hash:8].[ext]',
                        outputPath: 'images/',
                        limit: 1024
                    }
                }
            },
            {
                test: /\.(css|scss|less)/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            // modules: true
                        }
                    },
                    'postcss-loader']
            },
            {
                test: /\.(woff|woff2|ttf|svg|eot)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name]_[hash:8].[ext]',
                        outputPath: 'font/'
                    }
                }
            },
        ]    
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html')
        }),
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
}

module.exports = config;