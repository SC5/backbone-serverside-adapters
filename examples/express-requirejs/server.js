/**
 * Minimal static file web server to test drive the site
 */
var express = require('express'),
		http = require('http'),
		path = require('path'),
		fs = require('fs'),
		url = require('url'),
		_ = require('underscore'),
		cheerio = require('cheerio'),
		requirejs = require('requirejs'),
		adapters = require('../..');

var server = express(),
		filePath = path.join(__dirname, 'app'),
		indexFile = path.join(__dirname, 'app/index.html'),
		index = fs.readFileSync(indexFile, 'utf8'),
		$html = cheerio.load(index);

server.configure(function() {
	server.set('port', process.env.PORT || 8080);
	server.use(express.logger('dev'));
	// Use 'app' suffix for all the static data
	server.use('/app', express.static(filePath));
});

requirejs.config({
	nodeRequire: require,
	baseUrl: 'app',
	// Require.js config parameters are a simple way of passing
	// information to the shims
	config: {
		jquery: {
			jquery: $html 
		}
	}
});

requirejs(['app', 'backbone'], function (app, Backbone) {
	console.log('App initialized');
	
	// URL Endpoint for the 'web pages'
	server.get(/\/(items\/\d+)?$/, function(req, res) {
		// Remove preceeding '/'
		var path = req.path.substr(1, req.path.length);
		console.log('Routing to \'%s\'', path);
		
		// Initialize a blank document and a handle to its content
		//app.router.initialize();
		
		// If we're already on the current path, just serve the 'cached' HTML
		if (path === Backbone.history.path) {
			console.log('Serving response from cache');
			res.send($html.html());
		}
		
		// Listen to state change once - then send the response
		app.router.once('done', function(router, status) {
			// Just a simple workaround in case we timeouted or such
			if (res.headersSent) {
				console.warn('Could not respond to request in time; not rendered');
			}
			
			if (status === 'error') {
				res.send(500, 'Our framework blew it. Sorry.');
			}
			if (status === 'ready') {
				// Set the bootstrapped attribute to communicate client we're already done for first render
				var $root = $html('#main');
				$root.attr('data-bootstrapped', true);
				
				// Send the changed DOM to the client
				console.log('Serving response');
				res.send($html.html());
			}
		});
		
		// Then do the trick that would cause the state change
		Backbone.history.navigate(path, { trigger: true });
	});
	
	// URL endpoint for the 'data' that the 'web pages' consume
	server.get(/\/api\/items$/, function(req, res) {
		var items = [
			{id: '1', name: 'First item', description: 'This is the first item'},
			{id: '2', name: 'Second item', description: 'This is the second item'},
			{id: '3', name: 'Third item', description: 'This is the third item'}
		];
		res.send(JSON.stringify(items));
	});
});

http.createServer(server).listen(server.get('port'), function() {
	console.log('Express server listening on port', server.get('port'), 'serving files from', filePath);
});
