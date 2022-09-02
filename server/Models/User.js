import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
    },
    resetToken:{
        type:String,
    },
    tokenExpiry:{
        type:Date,
    }
})

export const UserModel = mongoose.model("user",UserSchema);