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
  // In your Post model, ensure image URL is stored correctly
image: {
  type: String,
  required: false,
  validate: {
    validator: function(v) {
      return v === null || 
             v.startsWith('http') || 
             v.startsWith('/uploads/');
    },
    message: 'Invalid image URL format'
  }
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