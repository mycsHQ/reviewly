module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    {
      name: 'reviewly',
      script: 'src/index.js',
      env: {
        COMMON_VARIABLE: 'true',
        DEBUG: '*',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy: {
    production: {
      user: 'deploy',
      host: process.env.INSTANCE_IP,
      ref: 'origin/master',
      repo: 'https://github.com/mycsHQ/reviewly.git',
      path: '/home/deploy',
      ssh_options: 'StrictHostKeyChecking=no',
      'post-deploy': 'yarn install --frozen-lockfile && yarn pm2 startOrRestart ecosystem.config.js --env production',
      env: {
        ACCESS_TOKEN: process.env.ACCESS_TOKEN
      }
    },
  },
};
