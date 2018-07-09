import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { 
  Strategy as JwtStrategy,
  ExtractJwt 
} from 'passport-jwt';

import User from '../resources/user/userModel';
import config from '../../config/config';


/* Passport jwt strategy
 * some options are REQUIRED; check https://github.com/themikenicholson/passport-jwt
 */
const jwtOptions = {
  secretOrKey: config.jwtSecret, // required

  // jwt has to be passed in the request header in the following format: Bearer <token>
  // check other options here: https://github.com/themikenicholson/passport-jwt#extracting-the-jwt-from-the-request
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // required
  algorithms: [config.jwtAlgorithm]
};

/* Passport sends a 401 unauthorized status by default if authentication fails
 * This strategy is used as a gatekeeper: if clients pass verification they are given
 * access to the requested resource in the controller for the route they hit
 * Because we will use this strategy as a route middleware for any protected route
 * we can't configure database operations (finding resources) in the body of the strategy like we
 * do with local strategy, which is used only for login
 */
const jwtStrategy = new JwtStrategy(jwtOptions, (jwtPayload, done) => {
  // jwtPayload is the decoded jwt
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
      let invalidLoginMessage = {
        notRegistered: {
          message: 'Email not registered.' 
        },
        general: {
          message: 'Username and password do not match.' 
        }
      };

      if (err) return done(err);
      
      if (!user) {
        // if using passport's flashing message, pass a third argument
        // as such: done({ message: 'Account not found.' }, false, { message: 'Account not found.' })
        // see docs http://www.passportjs.org/docs/configure/
        return done(invalidLoginMessage.notRegistered, false);
      }

      if (!user.verifyPassword(password)) {
        return done(invalidLoginMessage.general, false);
      }

      return done(null, user);
    });
});

// export strategies to be set globally on api.js
export default () => {
  passport.use(localStrategy);
  passport.use(jwtStrategy);
};

