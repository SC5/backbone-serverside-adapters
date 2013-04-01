(function() {
	// Compose RequireJS configuration run-time by determining the execution
	// context first. We may pass different values to browser and server.
	var isBrowser = typeof(window) !== 'undefined',
		adapters = isBrowser ? {} : require('../..');
	
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
				// Underscore needed for the server-side quirks
				deps: ['underscore', 'module'],
				exports: 'jQuery',
				init: function (_, module) {
					// Fetch the jQuery adapter parameters for server case, or
					// use vanilla jQuery provided for the browser
					return isBrowser ? this.jQuery.noConflict() :
						module && module.config().jquery;
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
						// Add the adapters we're going to be using
						_.extend(this.Backbone.history,
							adapters.backbone.history);
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
				// TODO Use full path due to our XHR adapter limitations
				url: 'http://localhost:8080/api/items'
			}
		}
	});
	
	/* The main application itself */
	define(['backbone', 'jquery', 'router'], function(Backbone, $, Router) {		
		// Start the processing
		var router = new Router();
		Backbone.history.start({ pushState: true });
		
		// Hookup into navigation to unnecessary reloading
		$('html').delegate('a', 'click', function(event) {
			var a = event.currentTarget,
				path = [ a.pathname, a.query ].join('');
			
			console.log('Navigating to', path);
			router.navigate(path, { trigger: true });
			
			// Prevent default handling of the event
			return false;
		});
		
		// Pass the app state back, just in case somebody needed it
		var app = {
			Backbone: Backbone,
			router: router
		};
		return app;
	});
})();