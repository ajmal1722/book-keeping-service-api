import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add title for the book"],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  imageUrl: {
    type: String,
    // required: true,
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

const Book = mongoose.model("Book", bookSchema);
export default Book;
