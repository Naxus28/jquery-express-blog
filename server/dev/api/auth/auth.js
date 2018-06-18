import passport from 'passport';
import localStrategy from './login/strategy';
import loginRoute from './login/loginRoute';

// set strategies first
passport.use(localStrategy);

// export for those strategies
export default loginRoute;