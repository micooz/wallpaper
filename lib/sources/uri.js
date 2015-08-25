'use strict';

var http = require('urllib').create();
var shell = require('shelljs');
var path = require('path');
var fs = require('fs');
var Q = require('q');
var log4js = require('log4js');
var logger = log4js.getLogger('wallpaper');

var _uri = '';

function _first(cb) {
  Q.promise(function (resolve, reject) {
    logger.info('downloading from: ' + _uri);

    http.request(_uri, {}, function (err, data) {
      var file = path.join(shell.tempdir(), 'tmp.jpg');
      fs.writeFile(file, data, function (err) {
        if (err) {
          logger.fatal('cannot save image to: ' + file);
          process.exit(-1);
        }
        cb(file);
      });
    });
  });
};

module.exports = {
  setup: function (uri) {
    _uri = uri;
    return {
      first: _first
    };
  }
};