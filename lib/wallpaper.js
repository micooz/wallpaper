'use strict';

var fs = require('fs');
var Q = require('q');
var log4js = require('log4js');
var platform = require('./platform.js');

var logger = log4js.getLogger('wallpaper');

module.exports = {
  set: function (options, callback) {
    Q.promise(function (resolve, reject) {
      var file = options.file;
      // NOTE: fs.exists() will be deprecated.
      // Reason:
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
        resolve();
      });
    }).then(function () {
      platform.set(options, function (err) {
        if (typeof callback != 'undefined') {
          callback(!err);
        }
      });
    }); // promise
  }
};