import { model, Schema } from "mongoose";

const israelPhoneRegex = /^0(?:[23489]|5[0-9]|7[2-9])-?[0-9]{7}$/;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        match: [israelPhoneRegex, 'Please provide a valid Israeli phone number']
    },
    password: {
        type: String,
        required: true,
        minlength: [4, 'Password must be at least 4 characters long']
    },
    dateRegistered: {
        type: Date,
        default: Date.now
    },
    borrowedBooks: [{
        id: String,
        nameBook: String
    }]
});

export const User = model('User', userSchema);