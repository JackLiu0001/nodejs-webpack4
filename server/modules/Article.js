import mongoose from 'mongoose';
import articlesSchemas from '../schemas/articles.js';
const Article = mongoose.model('Article', articlesSchemas);
export default Article;