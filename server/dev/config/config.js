import _ from 'lodash';
import colors from 'colors';

// values match config files
// e.g. ./development, ./production
// so we can require different configs using the
// directory path based on the environment
// e.g. import config from `./${config.env}`;
const config = {
  dev: 'development',
  test: 'test',
  prod: 'production',
  port: process.env.PORT || 8080
};

// set node env and config.env based on node env
process.env.NODE_ENV = process.env.NODE_ENV || config.dev;

// add the env key/value to the config object
config.env = process.env.NODE_ENV;

let envConfig = {};

// there will be an error if the file doesn't exist
try {
  envConfig = require(`./${config.env}`).default || {};
} catch(e) {
  console.log(`Error in ${__filename}: \n${e.stack.red}`);
}

export default _.merge(config, envConfig);

