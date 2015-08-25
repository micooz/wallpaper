'use strict';

var shell = require('shelljs');
var log4js = require('log4js');

var logger = log4js.getLogger('wallpaper');

var methods = [
  {
    // GNOME
    command: 'gsettings',
    options: 'set org.gnome.desktop.background picture-uri file://%s'
  }, {
    // GNOME2
    command: 'gconftool-2',
    options: '--set /desktop/gnome/background/picture_filename --type string %s'
  }, {
    // xfce
    command: 'xfconf-query',
    options: '-c xfce4-desktop -p /backdrop/screen0/monitor0/image-path -s %s'
  }, {
    // KDE
    command: 'dcop',
    options: 'kdesktop KBackgroundIface setWallpaper %s 1'
  }, {
    command: 'dconf',
    options: 'write /org/mate/desktop/background/picture-filename "%s"'
  }, {
    command: 'feh',
    options: '--bg-scale %s'
  }, {
    command: 'pcmanfm',
    options: '-w %s'
  }
];

exports.set = function (options, callback) {
  var found = false;
  methods.forEach(function (m) {
    if (found) {
      return;
    }
    var file = options.file;
    var commandline = m.command + ' ' + m.options.replace('%s', file);
    logger.info('try: ' + commandline);
    shell.exec(commandline, { async: false, silent: true }, function (code, output) {
      if (code == 0 && typeof callback != 'undefined') {
        found = true;
        callback(true);
      }
    });
  });
  logger.fatal('no proper method found to set your wallpaper');
};

// Reference:
//   https://github.com/sindresorhus/linux-wallpaper