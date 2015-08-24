'use strict';

var log4js = require('log4js');
var logger = log4js.getLogger('wallpaper');

var platform = null;

switch (process.platform) {
  case 'darwin':
    platform = require('./platforms/darwin.js');
    break;
  case 'linux':
    platform = require('./platforms/linux.js');
    break;
  case 'win32':
    platform = require('./platforms/win32.js');
    break;
  default:
    logger.fatal('doesn\'t support the current platform.');
    process.exit(-1);
    break;
}

logger.info('the current platform is: ' + process.platform);

module.exports = platform;