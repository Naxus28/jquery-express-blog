const router = require('express').Router(); 
import loginCtrl from './loginCtrl';
import { localAuth } from '../auth/middleware/authenticate';

// if client passes local authentication login middleware (using passport-local stratege)
// pass request flow to the controller where the jwt is created via a helper method and
// sent back to the client
router.route('/')
  .post(localAuth, loginCtrl);

export default router;
