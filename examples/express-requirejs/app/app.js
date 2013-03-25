(function() {
	// Compose RequireJS configuration run-time by determining the execution
	// context first. We may pass different values to browser and server.
	var isBrowser = typeof(window) !== 'undefined';
	
	// Execute this for RequireJS (client or server-side, no matter which)
	requirejs.config({
		
		paths: {
			text: 'components/requirejs-text/text',
			underscore: 'components/lodash/dist/lodash.underscore',
			backbone: 'components/backbone/backbone',
			handlebars: 'components/handlebars/handlebars',
			jquery: isBrowser ? 'components/jquery/jquery' : 'emptyHack'
		},
		
		shim: {
			'jquery': {
				deps: ['module'],
				exports: 'jQuery',
				init: function (module) {
					// Fetch the jQuery adapter parameters from the server-app if avail.
					if (module && module.config) {
						return module.config().jquery;
					}
					
					// Fallback to browser specific thingy
					return this.jQuery.noConflict();
				}
			},
			'underscore': {
				exports: '_',
				init: function () {
					return this._.noConflict();
				}
			},
			'backbone': {
				deps: ['underscore', 'jquery'],
				exports: 'Backbone',
				init: function (_, $) {
					// Inject adapters when in server
					if (!isBrowser) {
						var adapters = require('../..');
						// Add the adapters we're going to be using
						_.extend(this.Backbone.history, adapters.backbone.history);
						this.Backbone.ajax = adapters.backbone.ajax;
						Backbone.$ = $;
					}
					
					return this.Backbone.noConflict();
				}
			},
			'handlebars': {
				exports: 'Handlebars',
				init: function() {
					return this.Handlebars;
				}
			}
		},
		
		config: {
			// The API endpoints can be passed via URLs
			'collections/items': {
				// TODO Use full path, as our adapter does not yet interpret relative URLs
				url: 'http://localhost:8080/api/items'
			}
		}
	});
	
	/* The main application itself */
	define(['backbone', 'jquery', 'router'], function(Backbone, $, Router) {
		// Start the processing
		var router = new Router();
		Backbone.history.start({ pushState: true });
		
		// Pass the app state back, just in case somebody needed it
		var app = {
			Backbone: Backbone,
			router: router
		};
		return app;
	});
})();