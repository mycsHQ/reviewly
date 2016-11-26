// External dependencies
const Koa = require('koa');
const logger = require('koa-logger');
const bodyparser = require('koa-bodyparser');
const router = require('koa-router')();

// Internal modules
const config = require('./config')();
const serveApp = require('./serveApp');
const webhook = require('./webhook');

// Setup the app
const app = new Koa();

// Add middleware
app.use(logger());
app.use(bodyparser());

app
  .use(router.routes())
  .use(router.allowedMethods());

router.post('/webhook', webhook);

router.get('*', serveApp)




// Start server
app.listen(config.port, () => /* eslint-disable no-console */ console.log(`Reviewly successfuly started on port ${ config.port } with NODE_ENV ${ process.env.NODE_ENV }`) /* eslint-enable no-console */);

// Export server to allow testing
module.exports = app;