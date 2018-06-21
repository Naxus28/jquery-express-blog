import User from './userModel';
import { DatabaseException } from '../../../exceptions/exceptionClasses';
import { errorHandler } from '../../helpers/apiHelpers';
import _ from 'lodash';

/**
 * create user
 * @param  {Object} req  
 * @param  {Object} res 
 * @param  {Function} next
 * @return {undefined}       
 */
const addUser = (req, res, next) => {
  // hash the password and put it back on req.body
  let password = req.body.password;
  req.body.password = password && User.hashPassword(password) || '';

  new User(req.body)
    .save((err, user) => {
      let error;

      if (err) {
        error = typeof err === 'string' ? err : err.message;
      }

      // err.codeName is generated by mongoose/mongo 
      if (error) return errorHandler(error, DatabaseException, next);
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
    .populate('blogPosts')
    .exec((err, user) => {
      // err.codeName is generated by mongoose/mongo 
      if (err) return errorHandler(err.codeName, DatabaseException, next);
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
    .populate('blogPosts')
    .exec((err, user) => {
      // err.codeName is generated by mongoose/mongo 
      if (err) return errorHandler(err.codeName, DatabaseException, next);
      res.json(user); 
    });
};

export {
  addUser,
  getUsers,
  getUser
};