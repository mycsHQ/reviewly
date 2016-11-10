
const debug = require('debug')('reviewly:config');
const config = {
  dev: {
    environment: 'dev',
    port: process.env.PORT || 3000
  },
  test: {
    environment: 'test',
    port: process.env.PORT || 3000
  },
  staging: {
    environment: 'staging',
    port: process.env.PORT || 3000
  },
  production: {
    environment: 'production',
    port: process.env.PORT || 3000
  }
};

module.exports = (environment) => {
  debug('config loaded for environment', environment || process.env.NODE_ENV || 'dev');
  return config[environment || process.env.NODE_ENV || 'dev'];
};
