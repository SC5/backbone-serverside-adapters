var cheerio = require('./lib/cheerio'),
    backbone = require('./lib/backbone'),
	util = require('./lib/util');
	
var lib = {
  cheerio: cheerio,
  backbone: backbone,
  util: util
};

exports = module.exports = lib;