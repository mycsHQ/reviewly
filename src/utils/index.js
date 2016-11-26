/**
 * Module dependencies.
 */
const fs = require('fs');
const path = require('path');

/**
 * List of allowed language codes
 */
const langList = ['de', 'uk', 'fr', 'ch', 'at'];

/**
 * Return list of directories inside a given folder
 * 
 * @param {string} srcpath
 * @return {string[]} list of directories
 * @public
 */
const getDirectories = (srcpath) =>
  fs.readdirSync(srcpath).filter((file) =>
    fs.statSync(path.join(srcpath, file)).isDirectory());

/**
 * Build a url based of given subdomain
 * 
 * @param {string} subdomain
 * @return {string} a URL
 * @public
 */
const buildUrl = (host, subdomain) => {
  let lang = host[0];
  const domain = host[host.length -2],
        tld = host[host.length -1];
  if (langList.indexOf(lang) < 0) lang = 'de';
  return `http://${lang}.${subdomain}.${domain}.${tld}`;
}

/**
 * Module exports.
 * @public
 */
module.exports = {
  getDirectories: getDirectories,
  buildUrl: buildUrl
}