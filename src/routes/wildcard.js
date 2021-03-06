const path = require('path');
const fs = require('fs');
const send = require('koa-send');
const debug = require('debug')('reviewly');
const home = require('./home');

/**
 * Internal dependencies.
 */
const config = require('../config')();

/**
 * Default values.
 */
const rootFolder = config.rootFolder;
const featureFolder = config.featureFolder;

/**
 * Serve the content of a folder based on the subdomain
 *
 * @param {object} ctx
 * @return {string} result message
 * @public
 */
const wildcard = async ctx => {
  const host = ctx.req.headers.host.split('.'),
    featureName = host[1];

  let filePath = ctx.path === '/' ? 'index.html' : ctx.path;
  const featurePath = path.join(rootFolder, featureFolder, featureName);
  const featureFilePath = path.join(featurePath, filePath);
  const featureExists = fs.existsSync(featurePath);
  const featureFileExists = fs.existsSync(featureFilePath);

  debug('file requested', featureFilePath);
  // await rq;

  if (!featureExists) {
    return await home(ctx);
  } else if (!featureFileExists) {
    debug(featureFilePath, ` doesn't exits, we are using index.html`);

    // Stuff that can be ng-included
    if (/(svg|html)$/.test(filePath)) {
      ctx.body = 'Not found';
      return ctx;
    }

    filePath = 'index.html';
  }

  debug('file served', featureFilePath);

  await send(ctx, filePath, {
    root: featurePath
  });
};

/**
 * Module exports.
 * @public
 */
module.exports = wildcard;
