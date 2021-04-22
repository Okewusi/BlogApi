import {Schema, model} from 'mongoose';


const usersSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {
        type: String,
        minlength: [5, "password too short"],
        trim: true,
        required: true
      },
    age: {type: Number, min: 18, max: 65}
});


export default model('Users', usersSchema)