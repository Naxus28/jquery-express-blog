import mongoose from 'mongoose';

const BlogPost = new mongoose.Schema({
  author: {
    type: String,
    required: 'Author\'s name is mandatory.',
    unique: 'This username has already been taken.'
  },
  title: {
    type: String,
    required: 'Title is mandatory.',
    unique: 'This title has already been used.'
  },
  content: {
    type: String,
    required: 'Content is mandatory.'
  },
  publishDate: {
    type: Date,
    default: Date.now()
  },
  updatedDate: {
    type: Date,
    default: null
  } 
});

export default mongoose.model('BlogPost', BlogPost);

