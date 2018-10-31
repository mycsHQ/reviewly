/**
 * Module dependencies.
 */
const os = require('os');
const debug = require('debug')('reviewly:config');

/**
 * Config object
 * @public
 */
const config = {
  local: {
    environment: 'local',
    port: process.env.PORT || 3000,
    rootFolder: process.env.ROOT_FOLDER || process.cwd(),
    sourceFolder: 'src',
    featureFolder: 'features'
  },
  dev: {
    environment: 'dev',
    port: process.env.PORT || 3000,
    rootFolder: process.env.ROOT_FOLDER || os.homedir(),
    sourceFolder: 'source/src',
    featureFolder: 'features'
  },
  test: {
    environment: 'test',
    port: process.env.PORT || 3000,
    rootFolder: process.env.ROOT_FOLDER || os.homedir(),
    sourceFolder: 'reviewly/src',
    featureFolder: 'reviewly/tests/features'
  },
  staging: {
    environment: 'staging',
    port: process.env.PORT || 3000,
    rootFolder: process.env.ROOT_FOLDER || os.homedir(),
    sourceFolder: 'source/src',
    featureFolder: 'features'
  },
  production: {
    environment: 'production',
    port: process.env.PORT || 3000,
    rootFolder: process.env.ROOT_FOLDER || os.homedir(),
    sourceFolder: 'source/src',
    featureFolder: 'features'
  }
};

/**
 * Pseudo-factory to retrieve a config object based on the environment
 *
 * @param {string} environment
 * @return {object} config object
 * @public
 */
const configFactory = environment => {
  // Sanitize environment
  if (
    !process.env.NODE_ENV ||
    (process.env.NODE_ENV &&
      Object.keys(config).indexOf(process.env.NODE_ENV) === -1)
  ) {
    process.env.NODE_ENV = 'dev';
  }

  debug('config loaded for environment', environment || process.env.NODE_ENV);
  return config[environment || process.env.NODE_ENV];
};

/**
 * Module exports.
 * @public
 */
module.exports = configFactory;
