import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add your name'],
    },
    email: {
        type: String,
        required: [true, 'Please add email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please add password'],
    },
    roles: {
        type: [String],
        enum: ['author', 'borrower', 'library'],
        default: []
    },
    booksWritten: [ 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book',
        },
    ],
    borrowedBooks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book',
        },
    ],
    librariesOwned: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Library',
        },
    ],
    refreshToken: {
        type: String,
        default: null,
    }
})

const User = new mongoose.model('User', userSchema);
export default User;