// External dependencies
const os = require('os');
const Koa = require('koa');
const send = require('koa-send');
const logger = require('koa-logger');

// Internal modules
const config = require('./config')();

// Setup the app
const app = new Koa();

// Add middleware
app.use(logger());

// Serve folder based on subdomain
app.use(async (ctx, next) => {
  const subdomains = ctx.req.headers.host.split('.');
  const featureName = subdomains[0];
  const path = ctx.path === '/' ? 'index.html' : ctx.path;
  // TODO NRT: Verify the resource exists, if not, return index.html
  await send(ctx, path, { root: `${ os.homedir() }/${ featureName }` });
});

// Start server
app.listen(config.port, () => console.log(`Server started ${ config.port }`));

// Export server to allow testing
module.exports = app;
