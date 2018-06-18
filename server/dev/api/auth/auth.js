import passport from 'passport';
import { jwtStrategy, localStrategy } from './middleware/strategies';

// set strategy first before 
// using route

export default () => {
  passport.use(localStrategy);
  passport.use(jwtStrategy);
};

