import mongoose,{Schema} from 'mongoose';

export const studentSchema = new Schema({
    name:{
        type: String,
        required: true,
        minlength: 10
    },
    email:{
        type: String,
        required: true,
        match: "/^[a-zA-Z]{2}[@]{1}a-z{5,}(.)+(com)$/"
    }
});