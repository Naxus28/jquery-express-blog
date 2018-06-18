import { Strategy as LocalStrategy }from 'passport-local';
import User from '../../user/userModel';

// create local strategy for login
// The verify callback for local authentication accepts username and password arguments,
// which are submitted to the application via a login form (or ajax POST)
// By default, LocalStrategy expects to find credentials in parameters 
// named username and password. If your site prefers to name these fields differently,
// options are available to change the defaults. (see docs: http://www.passportjs.org/docs/username-password/)
export default new LocalStrategy({
    usernameField: 'email'
  },
  (email, password, done) => {
     console.log('email: ', email) 
     console.log('password: ', password) 
    User.findOne({ email }, (err, user) => {
      if (err) return done(err);
      
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }

      console.log('user.verifyPassword(password): ', user.verifyPassword(password));

      if (!user.verifyPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
});