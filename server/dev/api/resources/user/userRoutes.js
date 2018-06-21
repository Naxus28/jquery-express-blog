const router = require('express').Router();
import { jwtAuth } from '../../auth/authenticate';

import {
  addUser,
  deleteUser,
  getUsers,
  getUser
} from './userCtrl';

router.route('/')
  .get(getUsers) 
  .post(addUser);

// client needs to send jwt in the header (Authentication: Bearer <token>) with this GET request, 
// otherwise passport jwt strategy sends a 401 Unauthorized back
router.route('/:id')
  .get(jwtAuth, getUser) 
  .delete(jwtAuth, deleteUser) 

export default router;