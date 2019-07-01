const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const NODE_ENV = process.env.NODE_ENV;

const config = {
    entry: {
        "main": path.resolve(__dirname, './pratice.js'),
    },
    output: {
        publicPath: './',
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name]-[hash].js',
        chunkFilename: 'js/[name]-[id]-[hash].bundle.js'
    },
    plugins: [
    ],
    resolve: {
        alias: {
            jspath: path.resolve(__dirname, '/src/js/'),
            csspath: path.resolve(__dirname, '/src/css/'),
            rootPath: path.resolve(__dirname, '/src/'),
            componentsPath: path.resolve(__dirname, '/src/components/')
        },
        extensions: ['.js', '.vue', '.json']
    },
    module: {
        rules: [
        ]    
    },
    devServer: {
    }
}

module.exports = config;