import mongoose from "mongoose";

const librarySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    inventory: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book", // Reference to the Book schema
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Library = mongoose.model('Library', librarySchema);

export default Library