import express from 'express';
var router = express.Router();
import path from 'path';
import userModel from '../modules/User.js';

router.get('*', function(req, res, next) {

    // 判断session内用户信息，如果有用户名和用户密码则说明已登录
    var isLogined = req.session && req.session.userInfo && req.session.userInfo.userName && req.session.userInfo.password && req.cookies.userName;
    
    // console.log('req.session222222', req.session);
    console.log('isLogined', isLogined);
    if (isLogined) {
        res.render('dist/index', {
            isProduction: 'development',
            isLogined: isLogined
        });
    } else {
        // req.session.destroy()      # 清空所有session
        // req.session.key.destroy()    # 销毁名称为key的session的值
        req.session.destroy();
        res.clearCookie('userName');
        res.clearCookie('connect.sid');
        res.render('dist/index', {
            isProduction: 'development',
            isLogined: isLogined
        });
    }
    next();
});

export default router;