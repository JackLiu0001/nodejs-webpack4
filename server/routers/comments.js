import express from 'express';
import path from 'path';
import CommentsModel from '../modules/Comments.js';
import { port } from '../configs/configs.js';
const Mongoose = require('mongoose');
const { ObjectId } = Mongoose.Types;

export default ({
    router
}) => {

    // 获取评论
    router.post('/getComments', (req, res, next) => {
        let topic_id = req.body.topic_id || '';
        CommentsModel.find({topic_id: new ObjectId(topic_id)}, function(err, item) {
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
                data: item
            });
        })
    })

    // 写评论
    router.post('/writeComments', (req, res, next) => {

        // 文章id
        let topic_id = req.body.topic_id || '';

        // parent_id
        let parent_id = req.body.parent_id || '';

        // 评论内容
        let content = req.body.content || '';

        let newComment = new CommentsModel({
            topic_id: topic_id,
            parent_id: parent_id,
            content: content
        });
        newComment.save(err => {
            if(err) {
                res.json({
                    statusCode: 1002,
                    message: 'fail'
                })
                return console.error(err);
            }
            res.json({
                statusCode: 1000,
                message: 'success',
                data: {}
            })
        });
    });
};