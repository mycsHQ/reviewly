// External dependencies
const fs = require('fs');
const path = require('path');

// Get all directories from a directory (Synchronously)
const getDirectories = (srcpath) =>
  fs.readdirSync(srcpath).filter((file) =>
    fs.statSync(path.join(srcpath, file)).isDirectory());


module.exports = {
  getDirectories: getDirectories
}