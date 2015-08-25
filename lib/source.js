'use strict';

var shell = require('shelljs');

exports.setup = function (source, callback) {
  var sr = null;

  shell.cd('sources');
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
