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
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Book = mongoose.model("Book", bookSchema);
export default Book;
