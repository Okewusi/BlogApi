import mongoose from 'mongoose'
import {Schema, model} from 'mongoose';
const commentSchema = new Schema({
    comment: {type: String}
})
const postsSchema = new Schema({
    title: {type:String, required:true},
    post: {type: String, required:true},
    // comments: [commentSchema],
    owner: {type: mongoose.Schema.Types.ObjectId, required: true}
}) 

export default model('posts', postsSchema);

