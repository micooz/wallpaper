'use strict';

var fs = require('fs');
var Q = require('q');
var log4js = require('log4js');
var platform = require('./platform.js');
var source = require('./source.js');

var logger = log4js.getLogger('wallpaper');

exports.set = function (options, callback) {
  logger.info('the current platform is: ' + process.platform);

  Q.promise(function (resolve, reject) {
    // setup source then get image file
    source.setup(options.source, function (file) {
      resolve(file);
    });
  }).then(function (file) {
    Q.promise(function (resolve, reject) {
      // NOTE: fs.exists() will be deprecated.
      // 
      // In particular, checking if a file exists before opening it
      // is an anti-pattern that leaves you vulnerable to race conditions:
      // another process may remove the file between the calls to fs.exists() and fs.open().
      // Just open the file and handle the error when it's not there.
      // 
      // fs.exists(picture, function (exists) { });
      fs.open(file, 'r', function (err, fd) {
        if (err) {
          logger.fatal('the picture [' + file + '] doesn\'t exist');
          process.exit(-1);
        }
        resolve(file);
      });
    }).then(function (file) {
      platform.set({
        file: file
      }, function (err) {
        if (typeof callback != 'undefined') {
          callback(!err);
        }
      });
    });
  }); // promise
};