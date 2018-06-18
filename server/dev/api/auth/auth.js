import passport from 'passport';
import { jwtStrategy, localStrategy } from './middleware/strategies';

// export strategies to be set globally on api.js
export default () => {
  passport.use(localStrategy);
  passport.use(jwtStrategy);
};

