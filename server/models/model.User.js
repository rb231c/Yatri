import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: trur
    },
    password: {
        type: String,
        required: true
    },
    photo: {
        type: String,
    },
    role: {
        type: String,
        default: 'user'
    },
},{ timestamps: true }
);