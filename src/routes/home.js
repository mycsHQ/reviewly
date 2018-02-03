const path = require('path');
const rq = require('../utils/requestGh');
const pug = require('pug');
const _ = require('lodash');
const debug = require('debug')('reviewly');

/**
 * Internal dependencies.
 */
const config = require('../config')();
const utils = require('../utils');

/**
 * Default values.
 */
const rootFolder = config.rootFolder;
const featureFolder = config.featureFolder;
const sourceFolder = config.sourceFolder;
const template = pug.compileFile(
  path.join(rootFolder, sourceFolder, 'app', 'index.pug')
);
const home = async ctx => {
  ctx.type = 'text/html; charset=utf-8';
  const host = ctx.req.headers.host.split('.');
  const folderList = utils.getDirectories(path.join(rootFolder, featureFolder));

  try {
    const ghData = await rq;
    const pulls = ghData.repository.pullRequests.edges;
    const branchData = folderList.map(folder => {
      const pullData = pulls.find(
        pull => pull.node.headRefName.toLowerCase() === folder.toLowerCase()
      );

      const created = _.get(pullData, 'node.createdAt');

      const ret = {
        branch: folder,
        branchUrl: utils.buildUrl(host, folder),
        avatarUrl: _.get(pullData, 'node.author.avatarUrl'),
        author: _.get(pullData, 'node.author.login'),
        pullUrl: _.get(pullData, 'node.url'),
        createdAt: created ? new Date(created).toLocaleString() : '',
        title: _.get(pullData, 'node.title'),
        bodyHTML: _.get(pullData, 'node.bodyHTML'),
        created
      };

      return ret;
    });

    // folders without a pull request are pushed to the bottom
    branchData.sort((a, b) => {
      if (!a.created || !b.created) return -1;
      return (new Date(b.created)).getTime() - (new Date(a.created)).getTime();
    });

    const withUrl = branchData.filter(bd => bd.pullUrl)
    const withoutUrl = branchData.filter(bd => !bd.pullUrl)

    const tmpl = template({
      items: [...withUrl, ...withoutUrl]
    });

    ctx.body = tmpl;
  } catch (e) {
    debug('error: ', e);
  }
};

module.exports = home;
