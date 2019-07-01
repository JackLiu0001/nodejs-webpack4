import express from 'express';
import path from 'path';
import multer from 'multer';
import userModel from '../modules/User.js';
import imageModel from '../modules/Image.js';
import { port } from '../configs/configs.js';


/**
 * multer用户图片保存
 * 通过 filename 属性定制
*/
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, '../uploads/images'));    // 保存的路径，备注：需要自己创建
    },
    filename: function (req, file, cb) {
        cb(null, (new Date()).getTime() + '-' + file.originalname);     // 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943
    }
});

// 通过 storage 选项来对 上传行为 进行定制化
var upload = multer({ storage: storage })

export default ({
    router
}) => {

    // 图片上传
    router.post('/singleUploadImage', upload.single('file'), function (req, res, next) {
        /**
         * req.file 是 `avatar` 文件的信息
         * req.body 将具有文本域数据，如果存在的话
        */
        // debugger;
        // imageModel.find({userId: '5baf2684601295e32800adf4'}).populate('_creator').exec(function(err, image) {
        //     console.log('errrrrrr', err);
        //     console.log('story', image);
        // })
        // imageModel.find({userId: '5baf2684601295e32800adf4'}, function(err, result) {
        //     console.log('result', result);
        // })
        if (!req.file) {
            res.json({
                statusCode: 1001,
                message: '上传失败，请选择图片',
                data: {
                }
            });
        } else {
            const imageUrl = `${req.protocol}://${req.host}:${port}/images/${req.file.filename}`;
            let newImage = new imageModel({
                userName: req.session.userInfo.userName,
                url: imageUrl,
                userId: req.session.userInfo._id,
                _creator: req.session.userInfo._id
            });
            newImage.save(function(err) {
                if(err) return console.error(err);
                res.json({
                    statusCode: 1000,
                    message: '上传成功',
                    data: {
                        url: imageUrl
                    }
                });
            });
        }
    });
};