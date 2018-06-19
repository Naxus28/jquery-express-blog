import User from './userModel';
import { ApiException } from '../../../errorHandlers/exceptionClasses';
import { errorHandler } from '../../helpers/apiHelpers';

/**
 * create user
 * @param  {Object} req  
 * @param  {Object} res 
 * @param  {Function} next
 * @return {undefined}       
 */
const addUser = (req, res, next) => {
  // hash the password and put it back on req.body
  req.body.password = User.hashPassword(req.body.password);

   new User(req.body)
    .save((err, user) => {
      if (err) return errorHandler(err, ApiException, next);
      res.json(user.serializeResponse(user));
    });
};


/**
 * get users
 * @param  {Object} req 
 * @param  {Object} res 
 * @param  {Function} next
 * @return {undefined}       
 */
const getUsers = (req, res, next) => {
  User.find({})
    .select('-password') // removes password from returned query
    .exec((err, user) => {
      if (err) return errorHandler(err, ApiException, next);
      res.json(user);
    });
};


/**
 * get user
 * this controller is used in a protected route: 
 * before passing control flow to this controller,
 * the route checks if client sent jwt
 * @param  {Object} req 
 * @param  {Object} res 
 * @param  {Function} next
 * @return {undefined}       
 */
const getUser = (req, res, next) => {
  User.findOne({_id: req.params.id})
    .select('-password') // removes password from returned query
    .exec((err, user) => {
      if (err) return errorHandler(err, ApiException, next);
      res.json(user); 
    });
};

export {
  addUser,
  getUsers,
  getUser
};