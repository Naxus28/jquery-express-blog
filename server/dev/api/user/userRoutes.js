const router = require('express').Router();
import {
  addUser,
  getUsers
} from './userCtrl';

router.route('/')
  .get(getUsers) 
  .post(addUser);


  export default app => app.use('/user', router);