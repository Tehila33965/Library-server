import { model, Schema } from "mongoose";

const categories = ['Philosophy', 'Fiction', 'History', 'Science', 'Biography', 'Children'];

const bookSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: [2, 'Book name must be at least 2 characters long'],
        maxlength: [20, 'Book name must be at most 20 characters long'],
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        required: true,
        enum: categories
    },
    author: {
        name: String,
        phone: String,
        email: String
    }
});

export const Book = model('Book', bookSchema);