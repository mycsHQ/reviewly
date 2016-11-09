module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [
    {
      name      : "feature-branch-deployment",
      script    : "src/index.js",
      node_args : "--harmony-async-await",
      env: {
        COMMON_VARIABLE: "true"
      },
      env_production : {
        NODE_ENV: "production"
      }
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
      user : "deploy",
      host : process.env.FEATURE_DEPLOYEMENT_IP,
      ref  : "origin/master",
      repo : "https://github.com/mycsHQ/reviewly.git",
      path : "/home/deploy",
      "pre-deploy" : "npm install pm2 yarn -g",
      "post-deploy" : "yarn install && pm2 startOrRestart ecosystem.json --env production"
    }
  }
}
