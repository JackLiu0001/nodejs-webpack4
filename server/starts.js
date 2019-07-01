/**
 * 为了使用es6的新特性，引入    "babel-preset-env": "^1.7.0","babel-register": "^6.26.0",
 * 但是在starts必须引入一下，这个文件不能使用es6新特性，需要使用require
*/

require('babel-register')({
    presets: [ 'env' ]
})

// 导入初始的启动文件
module.exports = require('./server.js')