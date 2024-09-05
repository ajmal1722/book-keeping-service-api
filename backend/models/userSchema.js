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
    role: {
      type: String,
      enum: ['author', 'borrower', 'admin'],
      required: [true, 'Role is required'],
    },
    borrowedBooks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book',
        },
    ],
})

const User = new mongoose.model('User', userSchema);
export default User;