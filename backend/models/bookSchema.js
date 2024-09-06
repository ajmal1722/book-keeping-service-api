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
  // library: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Library",
  //   required: [true, "Library name is required"],
  // },
  borrower: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  imageUrl: {
    type: String,
    // required: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
});

const Book = mongoose.model("Book", bookSchema);
export default Book;
