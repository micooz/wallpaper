'use strict';

var fs = require('fs');
var sqlite3 = require('sqlite3').verbose();
var shell = require('shelljs');
var path = require('path');
var logger = require('../utils/logger.js');

var DB_PATH = path.join(
  process.env.HOME,
  'Library/Application Support/Dock/desktoppicture.db'
);

exports.set = function (options) {
  return new Promise(function (resolve, reject) {
    try {
      fs.accessSync(DB_PATH, fs.R_OK | fs.W_OK);
    } catch (err) {
      if (err) {
        logger.fatal('cannot access to: ' + DB_PATH);
        process.exit(-1);
      }
    }

    try {
      var db = new sqlite3.Database(DB_PATH, sqlite3.OPEN_READWRITE);
      var file = options.file;
      // note: this will update all records since there is no primary key in
      //       the data table.
      logger.info('updating database ' + DB_PATH);
      logger.debug('update data set value=' + file);

      db.run('UPDATE data SET value=?', file);
      db.close();

      logger.info('reloading Dock');

      shell.exec('killall Dock');

      resolve(true);
    } catch (err) {
      reject(err);
    }
  });
};

// Reference:
//   http://1klb.com/posts/2013/11/02/desktop-background-on-os-x-109-mavericks/