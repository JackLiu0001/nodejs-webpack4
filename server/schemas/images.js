import mongoose from 'mongoose';
const Schema = mongoose.Schema;
export default new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    _creator : {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
});