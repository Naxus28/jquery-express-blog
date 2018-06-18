import passport from 'passport';
import { 
  jwtStrategy, 
  localStrategy 
} from './login/strategies';

import loginRoute from './login/loginRoute';

// set strategies first
passport.use(localStrategy);

// export for those strategies
export default loginRoute;