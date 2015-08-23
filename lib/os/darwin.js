'use strict';

var fs = require('fs');
var Q = require('q');
var sqlite3 = require('sqlite3').verbose();
var shell = require('shelljs');
var path = require('path');
var log4js = require('log4js');
var logger = log4js.getLogger('wallpaper');

var DB_PATH = path.join(
  process.env.HOME,
  'Library/Application Support/Dock/desktoppicture.db'
  );

exports.set = function (picture, callback) {
  Q.promise(function (resolve, reject) {
    fs.open(DB_PATH, 'r+', function (err, fd) {
      if (err) {
        logger.fatal(DB_PATH + ' doesn\'t exist');
        process.exit(-1);
      }
      resolve();
    });
  }).then(function () {
    var db = new sqlite3.Database(DB_PATH, sqlite3.OPEN_READWRITE);
    // note: this will update all records since there is no primary key in 
    //       the data table.
    logger.info('updating database ' + DB_PATH);
    logger.debug('update data set value=' + picture);

    db.run('UPDATE data SET value=?', picture);
    db.close();

    logger.info('reloading Dock');

    shell.exec('killall Dock');
    callback(true);
  });
};

exports.get = function (callback) {
  Q.promise(function (resolve, reject) {
    fs.open(DB_PATH, 'r+', function (err, fd) {
      if (err) {
        logger.fatal(DB_PATH + ' doesn\'t exist');
        process.exit(-1);
      }
      resolve();
    });
  }).then(function () {
    var db = new sqlite3.Database(DB_PATH, sqlite3.OPEN_READWRITE);
    var querystr = 'SELECT value FROM data';
    // note: this will update all records since there is no primary key in 
    //       the data table.
    logger.info('fetching database ' + DB_PATH);

    Q.promise(function (resolve, reject) {
      db.all(querystr, function (err, rows) {
        callback(err, rows);
        resolve();
      });
    }).then(function () {
      db.close();
      logger.debug('database closed.');
    });
  });
}

// Refrences:
//   http://1klb.com/posts/2013/11/02/desktop-background-on-os-x-109-mavericks/