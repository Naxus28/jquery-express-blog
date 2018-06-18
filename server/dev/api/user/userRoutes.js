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
  .get(jwtAuth, getUser) // this get request needs to send jwt in the header, otherwise resource is not sent back to client

export default router;