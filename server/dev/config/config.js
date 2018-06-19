import _ from 'lodash';
import colors from 'colors';

const config = {
  port: process.env.PORT || 8080,
  env: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || 'nodejs',
  jwtExpiry: process.env.JWT_EXPIRY || '7d',  // https://github.com/auth0/node-jsonwebtoken#token-expiration-exp-claim 
  jwtAlgorithm: 'HS256'
};

let envConfig = {};

// config.env values will match config files
// e.g. ./development, ./production
// so we can require different configs using the
// directory path based on the environment
// e.g. import config from `./${config.env}`;
// there will be an error if the file doesn't exist
// so we use try/catch because this is a synchronous operation
try {
  envConfig = require(`./${config.env}`).default || {};
} catch(e) {
  console.log(`Error in ${__filename}: \n${e.stack.red}`);
}

export default _.merge(config, envConfig);

