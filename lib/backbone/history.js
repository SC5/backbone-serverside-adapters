var _ = require('underscore');

/**
 * Backbone Router compatible router to be used as a server-side substitute.
 * It implements the methods specified in Backbone public API.
 */

function navigate(p, options) {
	if (!options || options === true) {
		options = {
			trigger: options
		};
	}
	
	p = p || '';
	if (this.path === p) {
		return;
	}

	if (options.trigger) {
		this.loadUrl(p);
	}
}

function loadUrl(path) {
	var p = this.path = path;
	var matched = _.any(this.handlers, function(handler) {
		if (handler.route.test(p)) {
			handler.callback(p);
			return true;
		}
	});
	return matched;
}

/* The minimal, exported Router API */
var History = {
	// TODO Unimplemented API
	getHash: function(window) { console.warn('Not implemented'); },
	getFragment: function(fragment, forcePushState) { console.warn('Not implemented'); },
	start: function() { /*console.warn('Not implemented'); */ },
	stop: function() { /* console.warn('Not implemented'); */ },
	checkUrl: function(e) { console.warn('Not implemented'); },
	// Implemented API
	path: null,
	started: false,
	loadUrl: loadUrl,
	navigate: navigate
};

exports = module.exports = History;