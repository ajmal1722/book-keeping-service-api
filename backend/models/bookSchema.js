import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  bookName: {
    type: String,
    required: [true, "Please add Book name"],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Please add author name"],
  },
  library: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Library",
    required: [true, "Library name is required"],
  },
  borrower: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
});

const Book = mongoose.model("Book", bookSchema);
export default Book;
