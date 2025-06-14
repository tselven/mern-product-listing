import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        minlength: 6,
        maxlength: 128,
    },
    role:{
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    }
});

export const User = mongoose.model('User', userSchema);
export default User;