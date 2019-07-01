const webpack = require('webpack');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const fs = require('fs');
const NODE_ENV = process.env.NODE_ENV;
const isProduction = Boolean(NODE_ENV == 'pruduction');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const apiMocker = require('webpack-api-mocker');
console.log('__dirname', __dirname);

const config = {
    mode: "development",
    entry: {
        "main": path.resolve(__dirname, './index.js'),

        // 公共插件可以单独打包以便于浏览器本地缓存
        "vendors": [
            "vue",
            "vuex",
            "vue-router",
            "element-ui"
        ]
    },
    output: {
        publicPath: './',
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name]-[hash].js',
        chunkFilename: 'js/[name]-[id]-[hash].bundle.js'
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            // inject: false,
            template: './index.html',
        }),
        // 把入口文件里面的数组打包成vendors.js
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendors',
        //     filename: 'js/vendors.js'
        // }),

        // DefinePlugin 允许创建一个在编译时可以配置的全局常量
        new webpack.DefinePlugin({
            _isProduction: isProduction,
            // _baseUrl: JSON.stringify(Boolean(NODE_ENV == 'pruduction') ? "./" : "localhost:4000")
            _baseUrl: JSON.stringify(Boolean(NODE_ENV == 'pruduction') ? "" : "")
        }),
        // new cleanWebpackPlugin(['dist'])
    ],
    resolve: {
        alias: {
            jspath: path.resolve(__dirname, 'src/js/'),
            csspath: path.resolve(__dirname, 'src/css/'),
            rootPath: path.resolve(__dirname, 'src/'),
            componentsPath: path.resolve(__dirname, 'src/components/'),

            // npm默认安装vue“运行时”版本，加入下面代码，则使用编译+运行时版本，如果只使用“运行时”版本，则不能使用template，只能使用render函数
            // vue: 'vue/dist/vue.js'
        },
        extensions: ['.js', '.vue', '.json']
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader',
                        options: {
                            extractCSS: true
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader'
                }],
        
                // babel处理东西会很慢，node_modules里面的东西不需要babel处理
                exclude: [path.resolve(__dirname, 'node_modules')]
            },
            
            // 处理 css文件中出现的 url, 会自动帮你引入里面要引入的模块,use处理顺序是从右往左，先css-loader在style-loader
            {
                test: /\.css$/,
                use: ['vue-style-loader', 'style-loader', 'css-loader', { loader: 'postcss-loader', options: { sourceMap: true } }],
            },


            {
                test: /\.(jpg|png|gif|jpeg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10,
                        name: 'images/[name].[ext]'
                    }
                }]
            },
        
            // 用来匹配字体，
            {
                test: /\.(ttf|eot|woff|woff2|svg)$/,
                // use: ['file-loader']
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: 'fonts/[name]_[hash:8].[ext]'
                    }
                }]
            }
        ]    
    },
    devServer: {
        before(app){
            apiMocker(app, path.resolve('./mocker/index.js'), {
                // proxy: {
                //     '/repos/*': 'https://api.github.com/',
                // },
                changeHost: true,
            })
        },
        port: 4001,
        proxy: {
            '/api': 'http://localhost:3389',
            '/images': 'http://localhost:3389'
        },
        // 服务器打包资源后的输出路径
        publicPath: '/',
    }
}

// 这个使用uglifyjs压缩js代码，webpack 自带了一个压缩插件 UglifyJsPlugin
if (NODE_ENV != 'development') {
    config.plugins.push(
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify("production")
        }),
        new webpack.optimize.UglifyJsPlugin({
            minimize: true
        })
    );
}

module.exports = config;