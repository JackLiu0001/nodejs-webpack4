var express = require('express');
var url = require('url');
var ejs = require('ejs');
var path = require('path');
var fs = require('fs');

console.log('__dirname', __dirname);
console.log('__dirname', __dirname);
fs.readFile(path.join(__dirname, '/'), "utf-8", function(err, file) {
    console.log(err);
    console.log(file);
});