/**
 * Module dependencies.
 */
const path = require('path');
const fs = require('fs-extra');
const debug = require('debug')('reviewly');

/**
 * Internal dependencies.
 */
const config = require('../config')();

/**
 * Default values
 */
const rootFolder = config.rootFolder;
const featureFolder = config.featureFolder;

/**
 * Regular expression to match a path with a directory up component.
 */
const upPathRegex = /(?:^|[\\\/])\.\.(?:[\\\/]|$)/

/**
 * Receive a webhook from github and delete folder if branchName if found in request
 *
 * @param {object} ctx
 * @return {string} result message
 * @public
 */
const webhook = async (ctx) => {

  const branchName = ctx.request && ctx.request.body && ctx.request.body.ref;
  if (!branchName) {
    ctx.body = `No branchName found in request`;
    return ctx;
  }

  const fullPath = path.join(rootFolder, featureFolder, branchName);
  if (fs.existsSync(fullPath) && !upPathRegex.test(fullPath)) {
    debug(`${ fullPath } seems to exist, will try to delete`);
    fs.removeSync(fullPath);
    ctx.body = `${ branchName } has been deleted`;
  } else {
    ctx.body = `${ branchName } not found`;
  }
}

/**
 * Module exports.
 * @public
 */
module.exports = webhook;