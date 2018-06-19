import { sign as jwtSign } from 'jsonwebtoken';
import config from '../../../config/config';

/**
 * this function creates the jwt 
 * using https://github.com/auth0/node-jsonwebtoken
 * @param  {Object} user  
 * @return {jwt} 
 */
const createJwt = userEmail => {
  // see options at https://github.com/auth0/node-jsonwebtoken#token-expiration-exp-claim
  // 'iat' is included by default
  const jwtOptions = {
    subject: userEmail,
    expiresIn: config.jwtExpiry,
    algorithm: config.jwtAlgorithm
  };

  return jwtSign({ userEmail }, config.jwtSecret, jwtOptions);
};


export {
  createJwt
};