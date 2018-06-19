const router = require('express').Router(); 
import loginCtrl from './loginCtrl';
import { localAuth } from '../auth/authenticate';

// if request is authenticed via 'localAuth' middleware (using passport-local strategy)
// the control flow is passed to the controller where the jwt is created via a helper method and
// sent back to the client
router.route('/')
  .post(localAuth, loginCtrl);

export default router;
