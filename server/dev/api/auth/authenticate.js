import passport from 'passport';
const jwtAuth = passport.authenticate('jwt', { session: false });
const localAuth = passport.authenticate('local', { session: false });

// export passport authenticate middleware
// to create the authentication rules
// which is used in routes (before controllers)
export {
  jwtAuth,
  localAuth
};

