// External dependencies
const fs = require('fs');
const path = require('path');
const langList = ['de', 'uk', 'fr', 'ch', 'at'];

// Get all directories from a directory (Synchronously)
const getDirectories = (srcpath) =>
  fs.readdirSync(srcpath).filter((file) =>
    fs.statSync(path.join(srcpath, file)).isDirectory());

const buildUrl = (host, featureBranchName) => {
  let lang = host[0];
  const domain = host[host.length -2],
        tld = host[host.length -1];
  if (langList.indexOf(lang) < 0) lang = 'de';
  return `http://${lang}.${featureBranchName}.${domain}.${tld}`;
}

module.exports = {
  getDirectories: getDirectories,
  buildUrl: buildUrl
}