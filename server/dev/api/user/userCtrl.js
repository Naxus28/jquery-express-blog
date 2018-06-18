import User from './userModel';
import { ApiException } from '../../errorHandlers/exceptionClasses';
import { errorHandler } from '../apiHelpers';

const addUser = (req, res, next) => {
  // hash the password and put it back on req.body
  req.body.password = User.hashPassword(req.body.password.toString());

   new User(req.body)
    .save((err, user) => {
      if (err) return errorHandler(err, ApiException, next);
      res.json(user.serializeResponse(user));
    });
};

const getUsers = (req, res, next) => {
  User.find({})
    .select('-password') // removes password from returned query
    .exec((err, user) => {
      if (err) return errorHandler(err, ApiException, next);
      res.json(user);
    });
};


export {
  addUser,
  getUsers
};