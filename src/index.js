// External dependencies
// const os = require('os');
const path = require('path');
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
const featureFolder = config.featureFolder;

// Add middleware
app.use(logger());

// Serve folder based on subdomain
app.use(async (ctx) => {
  const subdomains = ctx.req.headers.host.split('.');
  const featureName = subdomains[1];
  let filePath = ctx.path === '/' ? 'index.html' : ctx.path;
  debug('file requested', path.join(rootFolder, featureFolder, featureName, filePath));
  /*
  if (!fs.existsSync(`${ rootFolder }/${ featureName }`)) {
    const folderList = utils.getDirectories(rootFolder);
    console.log(folderList);
  } else 
  */
  if (!fs.existsSync(path.join(rootFolder, featureFolder, featureName, filePath))) {
    debug(path.join(rootFolder, featureFolder, featureName, filePath), ` doesn't exits, we are using index.html`);
    filePath = 'index.html';
  }
  debug('file served', path.join(rootFolder, featureFolder, featureName, filePath));
  await send(ctx, filePath, { root: path.join(rootFolder, featureFolder, featureName) });
});

// Start server
app.listen(config.port, () => /* eslint-disable no-console */ console.log(`Reviewly successfuly started on port ${ config.port } with NODE_ENV ${ process.env.NODE_ENV }`) /* eslint-enable no-console */);

// Export server to allow testing
module.exports = app;