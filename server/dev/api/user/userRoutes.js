const router = require('express').Router();
import { jwtAuth } from '../auth/middleware/authenticate';

import {
  addUser,
  getUsers,
  getUser
} from './userCtrl';

router.route('/')
  .get(getUsers) 
  .post(addUser);

router.route('/:id')
  .get(jwtAuth, getUser)

export default router;