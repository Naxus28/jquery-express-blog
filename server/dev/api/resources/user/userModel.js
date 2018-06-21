import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// https://kikobeats.com/storing-passwords-101/
// Bcrypt is an adaptative password hashing function: 
// over time, the iteration count can be increased to make it slower, 
// so it remains resistant to brute-force search attacks even 
// with increasing computation power.
const emailRegexPattern = /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
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
    validate: [
      email => emailRegexPattern.test(email), 
      'Please enter a valid email address.'
    ]
  },
  password: {
    type: String,
    required: 'Password is mandatory.',
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
    // the function expects a string (it breaks with the following message if it is not a string: "data and hash must be strings")
    return bcrypt.compareSync(password.toString(), this.password);  
  },

  hashPassword: function(password){
    if (!password) {
      return '';
    } else {
      const saltRounds = 10;
      return bcrypt.hashSync(password, saltRounds); // hash and salt password
    }
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
// User.statics.hashPassword = password => {
//   if (!password) {
//     return '';
//   } else {
//     const saltRounds = 10;
//     return bcrypt.hashSync(password, saltRounds); // hash and salt password
//   }
// }; 

 

// this user schema middleware will run before a document is created
// check http://mongoosejs.com/docs/api.html#schema_Schema-pre
User.pre('save', function(next) {
  // 'isModified()' returns true if this document was modified, else false.
  // for more on 'isModified()' check http://mongoosejs.com/docs/api.html#document_Document-isModified
  if (!this.isModified('password')) return next();

  // this.hashPassword refers to the method created for 
  // each user instance (not static)
  this.password = this.hashPassword(this.password);
  next();
})

// http://mongoosejs.com/docs/middleware.html
// "The save() function triggers validate() hooks, 
// because mongoose has a built-in pre('save') hook that calls validate(). 
// This means that all pre('validate') and post('validate') hooks 
// get called before any pre('save') hooks."
// customize email 'unique' constraint error message 
// note: 'unique' is not a validator--cannot pass custom message like 'required'
User.post('save', (err, user, next) => {
  // default error to whatever comes from mongo
  let error = err;

  // name and code generated by 'unique' constraint
  if (err.name === 'MongoError' && err.code === 11000) {
    error = 'This email is already registered.';
    // not needed to create a new Error at this point because we handle 
    // errors with the errorHandler and exception classes
    // next('This email is already registered.');
  } else if (err.errors) {
    // errors is an object with validation errors
    // we have 'required' for email and password
    error = err.errors.email 
      ? err.errors.email 
      : err.errors.password;
  } 

  next(error);
});

export default mongoose.model('User', User);

