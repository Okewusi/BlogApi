import mongoose from 'mongoose';
import {Schema, model} from 'mongoose';

const commentSchema = new Schema({
    comment: {type: String, required: true},
    owner: {type: mongoose.Schema.Types.ObjectId, required: true},
    date: {type: Date, default: Date.now}
})

export default model("comments", commentSchema);