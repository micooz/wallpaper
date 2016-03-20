'use strict';

var fs = require('fs');
var platform = require('./platform.js');
var source = require('./source.js');
var logger = require('./utils/logger.js');

function checkAccess(file) {
  try {
    fs.accessSync(file, fs.R_OK);
  } catch (err) {
    logger.fatal('the picture [' + file + '] doesn\'t exist');
    process.exit(-1);
  }
  return file;
}

function setWallpaper(options, callback) {
  platform.set(options)
    .then(function () {
      callback && callback();
    })
    .catch(function (err) {
      logger.error(err);
    });
}

exports.set = function (options, callback) {
  // 1. setup source then get image file
  source.setup(options.source)

    // 2. check access of the file
    .then(function (file) {
      return checkAccess(file);
    })

    // 3. set wallpaper
    .then(function (file) {
      logger.info('setting wallpaper: ', file);
      delete options.source;
      options.file = file;
      setWallpaper(options, callback);
    });
};