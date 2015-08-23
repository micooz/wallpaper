'use strict';

var fs = require('fs');
var log4js = require('log4js');
var logger = log4js.getLogger('wallpaper');

var os = null, getter = null;

switch (process.platform) {
  case 'darwin':
    os = require('./os/darwin.js');
    break;
  case 'linux':
    os = require('./os/linux.js');
    break;
  case 'win32':
    os = require('./os/win32.js');
    break;
  default:
    logger.fatal('doesn\'t support the current platform.');
    process.exit(-1);
    break;
}

exports.set = function (picture, callback) {
  // NOTE: fs.exists() will be deprecated.
  // Reason: 
  // In particular, checking if a file exists before opening it
  // is an anti-pattern that leaves you vulnerable to race conditions: 
  // another process may remove the file between the calls to fs.exists() and fs.open().
  // Just open the file and handle the error when it's not there.
  //
  // fs.exists(picture, function (exists) { });  
  fs.open(picture, 'r', function (err, fd) {
    if (err) {
      logger.fatal('the picture [' + picture + '] doesn\'t exist');
      process.exit(-1);
    }
    os.set(picture, function (err) {
      if (typeof callback != 'undefined') {
        callback(!err);
      }
    });
  });
};

exports.get = function (callback) {
  os.get(function (err, paths) {
    if (typeof callback != 'undefined') {
      callback(err, paths);
    }
  });
};