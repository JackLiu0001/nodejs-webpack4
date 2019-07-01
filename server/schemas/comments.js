import mongoose from 'mongoose';
var Schema = mongoose.Schema;

export default new mongoose.Schema({
    topic_id: {
        type: String,
        default: ''
    },
    topic_type: {
        type: String,
        default: ''
    },
    parent_id: {
        type: String,
        default: ''
    },
    child_id: {
        type: String,
        default: ''
    },
    content: {
        type: String,
        default: ''
    }
});