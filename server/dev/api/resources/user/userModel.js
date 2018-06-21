import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// https://kikobeats.com/storing-passwords-101/
// Bcrypt is an adaptative password hashing function: 
// over time, the iteration count can be increased to make it slower, 
// so it remains resistant to brute-force search attacks even 
// with increasing computation power.
const saltRounds = 10;

const Schema = mongoose.Schema;

const User = new Schema({
  firstName: {
    type: String,
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  middleName: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    required: 'Email is mandatory.',
    unique: true,
    trim: true,
    validate: [email => /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email), 'Please fill a valid email address']
  },
  password: {
    type: String,
    required: 'Password is mandatory',
    trim: true
  },
  age: {
    type: Number,
    trim: true
  },
  blogPosts:[{
    type: Schema.Types.ObjectId,
    ref: 'BlogPost'
  }]
});

// http://mongoosejs.com/docs/2.7.x/docs/methods-statics.html
// instance method

// use 'function' instead of '=>' to avoid lexical binding 
// and avoid losing access to 'this' 
User.methods = {
  verifyPassword: function(password) {
    // for async comparison use 'compare' and handle promise with '.then'
    // the function expects a string (it breaks if it is not a string: "data and hash must be strings")
    return bcrypt.compareSync(password.toString(), this.password);  
  },

  // return user without password after saving document
  serializeResponse: function(user) {
    // need to convert mongodb document into an object to be able to delete key
    const updatedUser = user.toObject(); 
    delete updatedUser.password;

    return updatedUser;
  },
};

// static--same for all instances
// use hashSync to avoid handling promises
// NOTE: perhaps it would be better to use async method 
// and handle the hashed password in the 'then' method to avoid blocking I/O
User.statics.hashPassword = password => bcrypt.hashSync(password, saltRounds); 


User.post('save', (err, doc, next) => {
  if (err.name === 'MongoError' && err.code === 11000) {
    next(new Error('This email is already registered.'));
  } else {
    next(err);
  }
});

export default mongoose.model('User', User);

