import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  summary: {
    type: String,
    required: [true, 'Please add a summary'],
    maxlength: [300, 'Summary cannot be more than 300 characters']
  },
  content: {
    type: String,
    required: [true, 'Please add content']
  },
  image: {
    type: String,
    required: [true, 'Please add an image URL'],
    match: [
      /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif))$/i,
      'Please use a valid image URL'
    ]
  },
  author: {
    type: String,
    default: "You"
  },
  avatar: {
    type: String,
    default: "https://randomuser.me/api/portraits/men/1.jpg"
  },
  likes: {
    type: Number,
    default: 0
  },
  comments: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

export default mongoose.model('Post', postSchema);