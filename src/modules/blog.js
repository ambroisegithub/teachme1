import mongoose from "mongoose";
// import validator from "validator";

const blogSchema = new mongoose.Schema({
  image: {
    type: String,
    required: [true, "Image  is required"],
  },
  title: {
    type: String,
    required: [true, "Title field is required"],
  },
  description: {
    type: String,
    required: [true, "Description field is required"],
  },
  createdAt: { type: Date, default: Date.now },
//   comments: {
//     type: Array,
//   },
});
const BlogModel = mongoose.model("Blog", blogSchema);

export default BlogModel;
