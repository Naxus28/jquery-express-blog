import _ from 'lodash';
import colors from 'colors';

// values match config files
// e.g. ./development, ./production
// so we can require different configs using the
// directory path based on the environment
// e.g. import config from `./${config.env}`;
const config = {
  port: process.env.PORT || 8080,
  env: process.env.NODE_ENV || 'development'
};


let envConfig = {};

// there will be an error if the file doesn't exist
try {
  envConfig = require(`./${config.env}`).default || {};
} catch(e) {
  console.log(`Error in ${__filename}: \n${e.stack.red}`);
}

export default _.merge(config, envConfig);

