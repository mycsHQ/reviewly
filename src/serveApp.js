
const path = require('path');
const fs = require('fs');
const send = require('koa-send');

const debug = require('debug')('reviewly');


const config = require('./config')();
const utils = require('./utils');

const rootFolder = config.rootFolder;
const featureFolder = config.featureFolder;

const serveApp = async (ctx) => {
  const host = ctx.req.headers.host.split('.'),
        featureName = host[1];

  let filePath = ctx.path === '/' ? 'index.html' : ctx.path;
  debug('file requested', path.join(rootFolder, featureFolder, featureName, filePath));

  if (!fs.existsSync(path.join(rootFolder, featureFolder, featureName))) {
    const folderList = utils.getDirectories(path.join(rootFolder, featureFolder));
    debug(path.join(rootFolder, featureFolder), ` doesn't exits, we are listing all features`, folderList);
    let body = `This feature-branch was not found, here's what is already deployed on this server<br>`;
    body += folderList.map((folder) => `<a href="${ utils.buildUrl(host, folder) }">${folder}</a><br>`).join('');
    ctx.body = body;
    ctx.type = 'text/html; charset=utf-8';
    return ctx;
  } else if (!fs.existsSync(path.join(rootFolder, featureFolder, featureName, filePath))) {
    debug(path.join(rootFolder, featureFolder, featureName, filePath), ` doesn't exits, we are using index.html`);
    filePath = 'index.html';
  }
  debug('file served', path.join(rootFolder, featureFolder, featureName, filePath));
  await send(ctx, filePath, { root: path.join(rootFolder, featureFolder, featureName) });
}

module.exports = serveApp;