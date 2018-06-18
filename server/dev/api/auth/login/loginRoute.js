const router = require('express').Router(); 
import passport from 'passport';
import loginCtrl from './loginCtrl';

const localAuth = passport.authenticate('local', {session: false});

router.route('/')
  .post(localAuth, loginCtrl);

export default router;
