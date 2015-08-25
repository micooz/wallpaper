#!/usr/bin/env iojs
'use strict';

var wallpaper = require("./wallpaper.js");
var log4js = require('log4js');
var logger = log4js.getLogger('wallpaper');

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
  }
});