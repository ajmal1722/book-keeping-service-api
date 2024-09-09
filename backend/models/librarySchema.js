import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book", // Reference to the Book schema
        required: true,
    },
    borrower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
    },
    borrowedAt: {
        type: Date,
    },
    isAvailable: {
        type: Boolean,
        default: true,
    },
    charge: {
        type: Number,
        default: 0,
    },
});

const librarySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the Book schema
        required: true,
    },
    inventory: [inventorySchema],  
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Library = mongoose.model('Library', librarySchema);

export default Library;