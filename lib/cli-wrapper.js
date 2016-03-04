#!/usr/bin/env node
'use strict';

var wallpaper = require('./wallpaper.js');
var logger = require('./utils/logger.js');

var opts = require('nomnom')
  .option('help', {
    abbr: 'h',
    help: 'show help information.'
  }).option('style', {
    abbr: 's',
    help: 'the wallpaper style[Tile, Center, Stretch, Fit, Fill], Windows Only.',
    default: 'Stretch'
  }).option('source', {
    help: 'the wallpaper source, support imageset[bing, ...] (see lib/sources/) OR uri',
    default: 'bing'
  }).parse();

wallpaper.set(opts, function (err) {
  if (!err) {
    logger.info('your wallpaper have been set successfully.');
  } else {
    logger.error('fail to set your wallpaper.');
  }
});