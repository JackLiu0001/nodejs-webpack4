import mongoose from 'mongoose';
import commentsSchemas from '../schemas/comments';
const Comments = mongoose.model('Comments', commentsSchemas);
export default Comments;