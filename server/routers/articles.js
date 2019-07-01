import express from 'express';
import path from 'path';
import ArticleModel from '../modules/Article.js';
import { port } from '../configs/configs.js';
const Mongoose = require('mongoose');
const { ObjectId } = Mongoose.Types;

export default ({
    router
}) => {
    router.post('/article', function(req, res, next) {
        let newArticle = new ArticleModel({
            title: req.body.title,
            abstract: req.body.abstract,
            author: req.body.author,
            articleBody: req.body.articleBody,
            label: req.body.label
        });
        newArticle.save((err) => {
            if(err) {
                console.error(err);
                res.json({
                    statusCode: 1001,
                    message: 'fail',
                    data: {
                        userName: req.body.userName
                    }
                });
                next();
            }
            res.json({
                statusCode: 1000,
                message: 'success',
                data: {
                    userName: req.body.userName
                }
            });
        });
        // next();
    });
    router.post('/getArticle', function(req, res, next) {
        let page = req.body.page || 1;
        let count = req.body.count || 10;
        let label = req.body.label || '';
        let params = label ? {label: label} : {};
        let { userInfo = {} } = req.session;
        let { userName = '' } = userInfo;
        let user_Id = userInfo._id || '';

        new Promise((resolve, reject) => {

            // 获取文章总数量
            ArticleModel.find(params).countDocuments({}, (err, count) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(count);
                }
            });
        }).then(resp => {

            // 获取分页数据
            ArticleModel.find(params).skip((page - 1) * count).limit(Number(count)).exec(function(err, item) {
                if (err) {
                    res.json({
                        statusCode: 1001,
                        message: 'err',
                        data: err
                    });
                    return;
                }
                // console.log('itemitemitemitemitemitem', item);
                let articleData = item.map((result) => {

                    // 感谢
                    let isThank;
                    if (!result.thanks || !result.thanks.length) {
                        isThank = false;
                    } else {
                        isThank = result.thanks.some(result => {
                            return result.user_Id == user_Id;
                        });
                    }

                    // 点赞
                    let isPraise;
                    let praiseTotal = 0;
                    // console.log('result.praiseresult.praiseresult.praise', result.praise);
                    if (!result.praise || !result.praise.length) {
                        isPraise = false;
                    } else {
                        isPraise = result.praise.some(result => {
                            return result.user_Id == user_Id;
                        });
                        praiseTotal = result.praise.length || 0;
                    }


                    // 踩
                    let isNotPraise;
                    let notPraiseTotal = 0;
                    // console.log('notPraisenotPraisenotPraisenotPraisenotPraise', result.notPraise);
                    if (!result.notPraise || !result.notPraise.length) {
                        isNotPraise = false;
                    } else {
                        isNotPraise = result.notPraise.some(result => {
                            return result.user_Id == user_Id;
                        });
                        notPraiseTotal = result.notPraise.length || 0;
                    }

                    return {
                        _id: result._id,
                        title: result.title,
                        abstract: result.abstract,
                        author: result.author,
                        articleBody: result.articleBody,
                        label: result.label,
                        createDate: result.createDate,
                        lastUpdateDate: result.lastUpdateDate,
                        title: result.title,
                        title: result.title,
                        isThank: isThank,
                        isPraise: isPraise,
                        praiseTotal: praiseTotal,
                        isNotPraise: isNotPraise,
                        notPraiseTotal: notPraiseTotal
                    }
                });
                res.json({
                    statusCode: 1000,
                    message: 'success',
                    total: resp,
                    currentPage: page,
                    data: articleData
                });
            });
        });
    });

    // 获取单个文章
    router.post('/getOneArticle', function(req, res, next) {
        let _id = req.body._id || '';
        ArticleModel.find({_id: new ObjectId(_id)}, function(err, item) {
            if (err) {
                res.json({
                    statusCode: 1001,
                    message: 'fail'
                });
                return console.error(err);
            }
            res.json({
                statusCode: 1000,
                message: 'success',
                data: item && item[0]
            });
        })
    });
};