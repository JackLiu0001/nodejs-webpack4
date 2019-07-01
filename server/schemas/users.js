import mongoose from 'mongoose';
var Schema = mongoose.Schema;

export default new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    images: {
        type: Schema.Types.ObjectId,
        ref: 'images'
    }
});