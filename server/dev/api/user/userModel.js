import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// https://kikobeats.com/storing-passwords-101/
// Bcrypt is an adaptative password hashing function: 
// over time, the iteration count can be increased to make it slower, 
// so it remains resistant to brute-force search attacks even 
// with increasing computation power.
const saltRounds = 10;

const User = new mongoose.Schema({
  firstName: {
    type: String,
    required: 'First name is mandatory',
    trim: true
  },
  lastName: {
    type: String,
    required: 'Last name is mandatory',
    trim: true
  },
  middleName: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    required: 'Email is mandatory',
    unique: 'This email is already registered',
    trim: true
  },
  password: {
    type: String,
    required: 'Password is mandatory',
    trim: true
  },
  age: {
    type: Number,
    trim: true
  }
});

// http://mongoosejs.com/docs/2.7.x/docs/methods-statics.html
// instance method

// use 'function' instead of '=>' to avoid lexical binding 
// and avoid losing access to 'this' 
User.methods = {
  verifyPassword: function(password) {
    bcrypt.compare(password, this.password);
  },

  // return user without password after saving user
  serializeResponse: function(user) {
    // need to convert mongodb document into an object to be able to delete key
    const thisUser = user.toObject(); 
    delete thisUser.password;

    return thisUser;
  },
};

// static--same for all instances
User.statics.hashPassword = password => bcrypt.hashSync(password, saltRounds);

export default mongoose.model('User', User);

