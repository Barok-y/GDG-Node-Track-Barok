import {Schema} from mongoose;

const UserSchema = new Schema({
    fullname:{
        type:String,
        required:[true,"Full name can't be empty"]
    },
    email:{
        type:String,
        required:[true,"Email Can't be empty"],
        lowercase:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        minlength:[8,"Minimum length 8"]
    }
})
export default UserSchema; 