// External dependencies
// const os = require('os');
const fs = require('fs');
const Koa = require('koa');
const send = require('koa-send');
const logger = require('koa-logger');
const assert = require('assert');
const debug = require('debug')('reviewly');

// Internal modules
const config = require('./config')();
// const utils = require('./utils');
assert(!!config, `config needs to be defined for ${ process.env.NODE_ENV }`);

// Setup the app
const app = new Koa();
const rootFolder = config.rootFolder;

// Add middleware
app.use(logger());

// Serve folder based on subdomain
app.use(async (ctx) => {
  const subdomains = ctx.req.headers.host.split('.');
  const featureName = subdomains[1];
  let path = ctx.path === '/' ? '/index.html' : ctx.path;
  debug('file requested', `${ rootFolder }/${ featureName }${ path }`);
  /*
  if (!fs.existsSync(`${ rootFolder }/${ featureName }`)) {
    const folderList = utils.getDirectories(rootFolder);
    console.log(folderList);
  } else 
  */
  if (!fs.existsSync(`${ rootFolder }/${ featureName }${ path }`)) {
    debug(`${ rootFolder }/${ featureName }${ path } doesn't exits, we are using index.html`);
    path = '/index.html';
  }
  debug('file served', `${ rootFolder }/${ featureName }${ path }`);
  await send(ctx, path, { root: `${ rootFolder }/${ featureName }` });
});

// Start server
app.listen(config.port, () => /* eslint-disable no-console */ console.log(`Reviewly successfuly started on port ${ config.port } with NODE_ENV ${ process.env.NODE_ENV }`) /* eslint-enable no-console */);

// Export server to allow testing
module.exports = app;