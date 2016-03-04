'use strict';

var logger = require('./utils/logger');

var platform = undefined;

logger.info('the current platform is: ' + process.platform);

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

module.exports = platform;