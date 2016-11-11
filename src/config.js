// External dependencies
const os = require('os');
const debug = require('debug')('reviewly:config');

const config = {
  dev: {
    environment: 'dev',
    port: process.env.PORT || 3000,
    rootFolder: process.env.ROOT_FOLDER || os.homedir(),
    featureFolder: 'features'
  },
  test: {
    environment: 'test',
    port: process.env.PORT || 3000,
    rootFolder: process.env.ROOT_FOLDER || os.homedir(),
    featureFolder: 'features'
  },
  staging: {
    environment: 'staging',
    port: process.env.PORT || 3000,
    rootFolder: process.env.ROOT_FOLDER || os.homedir(),
    featureFolder: 'features'
  },
  production: {
    environment: 'production',
    port: process.env.PORT || 3000,
    rootFolder: process.env.ROOT_FOLDER || os.homedir(),
    featureFolder: 'features'
  }
};

module.exports = (environment) => {
  debug('config loaded for environment', environment || process.env.NODE_ENV || 'dev');
  return config[environment || process.env.NODE_ENV || 'dev'];
};
