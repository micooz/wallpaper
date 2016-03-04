'use strict';

var shell = require('shelljs');
var path = require('path');

var cd = shell.cd;
var ls = shell.ls;

exports.setup = function (source) {
  return new Promise(function (resolve, reject) {
    var sr = undefined;

    cd(path.join(__dirname, '/sources'));
    ls('*.js').forEach(function (srcjs) {
      if (srcjs === source + '.js') {
        var reqsrc = './sources/' + srcjs;
        sr = require(reqsrc);
      }
    });

    if (!sr) {
      // it's an URI
      sr = require('./sources/uri.js').setup(source);
    }

    sr.first(function (file) {
      resolve(file);
    });
  });
};
