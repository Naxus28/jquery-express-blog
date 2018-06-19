import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const BlogPost = new Schema({
  author: { 
    type: Schema.Types.ObjectId, 
    ref: 'User',
    required: 'Blogposts must belont to a user.'
  },
  title: {
    type: String,
    required: 'Title is mandatory',
    unique: 'This title has already been used'
  },
  slug: {
    type: String,
    required: 'Slug is mandatory.',
    unique: 'A slug for this title has already been used.'
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

