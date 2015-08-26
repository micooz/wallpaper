'use strict';

var shell = require('shelljs');
var path = require('path');

exports.setup = function (source, callback) {
  var sr = null;

  shell.cd(path.join(__dirname, '/sources'));
  shell.ls('*.js').forEach(function (srcjs) {
    if (srcjs == (source + '.js')) {
      var reqsrc = './sources/' + srcjs;
      sr = require(reqsrc);
    }
  });

  if (!sr) {
    // it's an URI
    sr = require('./sources/uri.js').setup(source);
  }

  sr.first(function (file) {
    if (typeof callback != 'undefined') {
      callback(file);
    }
  });
};
