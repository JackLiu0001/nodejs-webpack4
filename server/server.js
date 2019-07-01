import express from 'express';
import path from 'path';
import url from 'url';
import ejs from 'ejs';
import fs from 'fs';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import mongoose from 'mongoose';
import { port } from './configs/configs.js';
import Api from './routers/api.js';
import Main from './routers/main.js';
var router = express.Router();
var FileStore = require('session-file-store')(session);

// 创建app应用
let app = express();

// 使用 cookieParser 中间件，cookieParser(secret, options)
// 其中 secret 用来加密 cookie 字符串（下面会提到 signedCookies）
// options 传入上面介绍的 cookie 可选参数
app.use(cookieParser());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
 
// parse application/json
app.use(bodyParser.json())

//注册ejs模板为html页。简单的讲，就是原来以.ejs为后缀的模板页，现在的后缀名可以//是.html了
app.engine('.html', ejs.__express);

// 设置模板文件存放的目录，第一个参数必须是views，第二个参数是目录
app.set('views', path.resolve(__dirname, './fe'));

//设置视图模板的默认后缀名为.html,避免了每次res.Render("xx.html")的尴尬
app.set('view engine', 'html');

// 数据库连接成功启动http服务
mongoose.connect('mongodb://localhost:27017/runoob', function(err) {
    if (err) {
        console.log('数据库连接失败');
    } else {
        console.log('数据库连接成功');
        app.listen(3389, function() {
            console.log('端口', 3389);
        });
    }
});

// 在开发过程中，需要取消模板缓存
// ejs.setDefaults({cache: false});

// 设置静态文件托管，第一个参数’/dist‘是设置的虚拟路径
// app.use('/dist', express.static(path.resolve(__dirname, './fe/dist')));
app.use('/', express.static(path.resolve(__dirname, './fe/dist')));

// 设置上传文件的静态托管
app.use(express.static(path.resolve(__dirname,'./uploads')));

// 按照上面的解释，设置 session 的可选参数
app.use(session({
    resave: false,  //重新保存,(是否允许)当客户端并行发送多个请求时，其中一个请求在另一个请求结束时对session进行修改覆盖并保存。默认为true。
    saveUninitialized: true,    // 初始化session时是否保存到存储。默认为true， 但是(后续版本)有可能默认失效，所以最好手动添加。
    // name: 'test',   //返回客户端的key的名称，默认为connect.sid,也可以自己设置。
    store: new FileStore(),  // 本地存储session（文本文件，也可以选择其他store，比如redis的）
    secret: 'recommand 128 bytes random string', // 建议使用 128 个字符的随机字符串
    cookie: { 
        maxAge: 1000 * 60 * 60 * 24, 
        // httpOnly: true,     // 默认是true
        // secure: true,
        // path: '/',
    } // 设置返回到前端key的属性，默认值为{ path: ‘/’, httpOnly: true, secure: false, maxAge: null }。
}));

// app.use('/admin', require('./routers/admin.js'));
app.use('/', Main);
app.use('/api', Api);