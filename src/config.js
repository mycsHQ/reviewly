const config = {
  dev: {
    environment: 'dev',
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

module.exports = (environment) => config[environment || process.env.NODE_ENV || 'dev'];
