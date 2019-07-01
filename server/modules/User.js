import mongoose from 'mongoose';
import usersSchemas from '../schemas/users.js';
const User = mongoose.model('User', usersSchemas);
export default User;


/**
 * var schema = new mongoose.Schema({ name: 'string', size: 'string' });
 * var Tank = mongoose.model('Tank', schema);
 * The first argument is the singular name of the collection your model is for. 
 * Mongoose automatically looks for the plural version of your model name. 
 * Thus, for the example above, the model Tank is for the tanks collection in the database. 
 * The .model() function makes a copy of schema. 
 * Make sure that you've added everything you want to schema before calling .model()!
 * 我的理解，mongoose.model('Tank', schema);第一个参数Tank会自动找到tanks collection
 * 如果不想使用该简写方法，可以使用以下两种方法
 * 1、var User = mongoose.model('User', usersSchemas, 'users');第三个参数是collection名，这样也可以连接collection
 * 2、new mongoose.Schema({name: String}, {collection: 'users'})
*/
