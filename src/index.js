// External dependencies
const os = require('os');
const Koa = require('koa');
const send = require('koa-send');
const logger = require('koa-logger');
const assert = require('assert');
const debug = require('debug')('reviewly');

// Internal modules
const config = require('./config')();
assert(!!config, `config needs to be defined for ${ process.env.NODE_ENV }`);

// Setup the app
const app = new Koa();
const rootFolder = process.env.ROOT_FOLDER || os.homedir();

// Add middleware
app.use(logger());

// Serve folder based on subdomain
app.use(async (ctx) => {
  const subdomains = ctx.req.headers.host.split('.');
  const featureName = subdomains[1];
  const path = ctx.path === '/' ? 'index.html' : ctx.path;
  debug('rootFolder', rootFolder, 'featureName', featureName, 'path', path);
  // TODO NRT: Verify the resource exists, if not, return index.html
  await send(ctx, path, { root: `${ rootFolder }/${ featureName }` });
});

// Start server
app.listen(config.port, () => /* eslint-disable no-console */ console.log(`Reviewly successfuly started on port ${ config.port } with NODE_ENV ${ process.env.NODE_ENV }`) /* eslint-enable no-console */);

// Export server to allow testing
module.exports = app;