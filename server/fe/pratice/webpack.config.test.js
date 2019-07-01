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
        contentBase: './dist',  // devserver的根目录
        open: true, // 会自动帮你打开浏览器
        // proxy: '', // 用来做跨域接口代理
        // port: ', // 指定默认端口号
        hot: true,
        hotOnly: true   // 如果不设置，html出错的时候会刷新页面，设置为true，html出错也不会刷新页面
    },
    output: {
        publicPath: './',   // 指定资源基础路径
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
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',  // babel-loader是webpack和babel做通信的桥梁，并不会打包代码
                options: {
                    presets: [
                        "@babel/preset-env", // preset-env会把es6的代码打包成es5的代码，只是翻译了一部分，还有一些es6的功能不能通过preset-env翻译，所以需要polyfill帮助
                        {
                            // targets: {
                            //     chrome: "<67"   // 小于67的版本才会进行es6转es5 打包
                            // },
                            useBuiltIns: 'usage'    // 在做polyfill做代码填充的时候，不是所有的垫片都会加载进去，如果我只用到了promise那么只填充promise的垫片，其他的不会填充，这样js就不会那么大了
                        }
                    ],

                    // 业务开发的时候上面的presets设置就可以了，如果要开发是一个库代码，这个时候要用 plugin-transform-runtime和@babel/runtime，因为他们会闭包形式注入，防止污染全局环境
                    // 如果使用这种方式 上面的presets就可以不要了
                    // "plugins": [
                    //     [
                    //         "@babel/plugin-transform-runtime",
                    //         {
                    //             "absoluteRuntime": false,
                    //             "corejs": false,
                    //             "helpers": true,
                    //             "regenerator": true,
                    //             "useESModules": false
                    //         }
                    //     ]
                    // ]
                }
            },
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