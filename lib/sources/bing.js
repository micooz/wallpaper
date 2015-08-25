'use strict';

var http = require('urllib').create();
var shell = require('shelljs');
var path = require('path');
var fs = require('fs');
var Q = require('q');
var log4js = require('log4js');
var logger = log4js.getLogger('wallpaper');

var resource = {
  url: 'http://cn.bing.com/HPImageArchive.aspx',
  params: {
    format: 'js', // return json
    idx: 0, // 0 - today, 1 - yestoday, 2 - the day before yesterday ...
    n: 1 // how many images in the result
  }
};

exports.first = function (cb) {
  Q.promise(function (resolve, reject) {
    logger.info('fetching from: ' + resource.url);

    http.request(resource.url, {
      data: resource.params,
      dataType: 'json'
    }, function (err, data, res) {
      var json = data;
      var url = json.images[0].url;
      resolve(url);
    });
  }).then(function (url) {
    logger.info('downloading from: ' + url);

    http.request(url, {}, function (err, data) {
      var file = path.join(shell.tempdir(), 'tmp.jpg');
      fs.writeFile(file, data, function (err) {
        if (err) {
          logger.fatal('cannot save image to: ' + file);
          process.exit(-1);
        }
        cb(file);
      });
    });
  }); // promise
};