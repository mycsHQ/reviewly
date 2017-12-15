const path = require("path");
const rq = require("../utils/requestGh");
const pug = require("pug");
const _ = require("lodash");

/**
 * Internal dependencies.
 */
const config = require("../config")();
const utils = require("../utils");

/**
 * Default values.
 */
const rootFolder = config.rootFolder;
const featureFolder = config.featureFolder;
const template = pug.compileFile(
  path.join(rootFolder, "src", "app", "index.pug")
);

const home = async ctx => {
  ctx.type = "text/html; charset=utf-8";
  const host = ctx.req.headers.host.split(".");
  const folderList = utils.getDirectories(path.join(rootFolder, featureFolder));

  try {
    const ghData = await rq;
    const pulls = ghData.repository.pullRequests.edges;
    const branchData = folderList.map(folder => {
      const pullData = pulls.find(pull => pull.node.headRefName === folder);

      const ret = {
        branch: folder,
        branchUrl: utils.buildUrl(host, folder),
        avatarUrl: _.get(pullData, "node.author.avatarUrl"),
        author: _.get(pullData, "node.author.login"),
        pullUrl: _.get(pullData, "node.url"),
        createdAt: _.get(pullData, "node.createdAt"),
        title: _.get(pullData, "node.title")
      };

      return ret;
    });

    const tmpl = template({
      items: branchData
    });

    ctx.body = tmpl;
  } catch (e) {
    console.error(e);
  }
};

module.exports = home;
