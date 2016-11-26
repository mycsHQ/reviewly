// External dependencies
const path = require('path');
const fs = require('fs');

const debug = require('debug')('reviewly');

// Internal modules
const config = require('./config')();

const rootFolder = config.rootFolder;
const featureFolder = config.featureFolder;

const webhook = async (ctx) => {
  const body = ctx.request.body;
  debug(body);
  const branchName = body.ref;
  if (!branchName) {
    ctx.body = `No branchName found in request`;
    return ctx;
  }
  const fullPath = path.join(rootFolder, featureFolder, branchName);
  if (fs.existsSync(fullPath)) {
    debug(`${ fullPath } seems to exist, will try to delete`);
    fs.rmdirSync(fullPath);
    ctx.body = `${ branchName } has been deleted`;
  } else {
    ctx.body = `${ branchName } not found`;
  }
}

module.exports = webhook;