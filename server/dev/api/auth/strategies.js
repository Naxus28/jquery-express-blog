import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { 
  Strategy as JwtStrategy,
  ExtractJwt 
} from 'passport-jwt';

import User from '../user/userModel';
import config from '../../config/config';


/* Passport jwt strategy
 * some options are REQUIRED; check https://github.com/themikenicholson/passport-jwt
 */
const jwtOptions = {
  secretOrKey: config.jwtSecret, // required

  // jwt has to be passed in the request header in the following format Bearer <token>
  // check other options here: https://github.com/themikenicholson/passport-jwt#extracting-the-jwt-from-the-request
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // required
  algorithms: [config.jwtAlgorithm]
};

const jwtStrategy = new JwtStrategy(jwtOptions, (jwtPayload, done) => {
  console.log('jwtPayload: ', jwtPayload) 
  done(null, jwtPayload);
});


/* Passport local strategy for login
 * The verify callback for local authentication accepts username and password arguments,
 * which are submitted to the application via a login form (or ajax POST)
 * By default, LocalStrategy expects to find credentials in parameters 
 * named username and password. If your site prefers to name these fields differently,
 * options are available to change the defaults. (see docs: http://www.passportjs.org/docs/username-password/)
 */
const localStrategy = new LocalStrategy({
    // passport expects user to send 'username' 
    // but this app's user model has field 'email' instead
    usernameField: 'email'  
  },
  // passport receives these values in the params
  // from req.body (req.body.email, req.body.password)
  // 'done' is the callback that informs passport the 
  // processing is done.
  (email, password, done) => {
    User.findOne({ email }, (err, user) => {
      if (err) return done(err);
      
      if (!user) {
        // id using passport's flashing message, pass a third argument
        // as such done({ message: 'Account not found.' }, false, { message: 'Account not found.' })
        // see docs http://www.passportjs.org/docs/configure/
        return done({ message: 'Account not found.' }, false);
      }

      if (!user.verifyPassword(password)) {
        return done({ message: 'Incorrect password.' }, false);
      }

      return done(null, user);
    });
});

// export strategies to be set globally on api.js
export default () => {
  passport.use(localStrategy);
  passport.use(jwtStrategy);
};

