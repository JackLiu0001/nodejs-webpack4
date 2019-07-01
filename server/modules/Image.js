import mongoose from 'mongoose';
import imagesSchemas from '../schemas/images.js';
const Image = mongoose.model('Image', imagesSchemas);
export default Image;