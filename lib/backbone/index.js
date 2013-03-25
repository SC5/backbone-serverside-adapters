var history = require('./history'),
	ajax = require('./ajax'),
	cheerio = require('cheerio');
	
var BackboneAdapters = {
	history: history,
	ajax: ajax,
	$: cheerio
}

exports = module.exports = BackboneAdapters;
