var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest,
	_ = require('underscore');

// TODO This is the first proto hack and only supports GET
// Implement a full support with other HTTP commands and really $.ajax compliant way
function handleStateChange(settings) {
	
	// Initialize the response callbacks
	function nop() { console.log('Dummy XHR callback executed'); };
	var success = typeof(settings.success) === 'function' ? settings.success : nop,
		error = typeof(settings.error) === 'function' ? settings.error : nop;
	
	// Handle the status; 2XX requests are alright; for the others, we don't yet support them,
	// e.g. following redirects
	if (this.readyState == 4 && this.status >= 200 && this.status < 300 || this.status === 304) {
		try {
			console.log('XHR completed with status:', this.status);
			success(format(this.responseText, settings.dataType, this), this.status, this);
		} catch (e) {
			console.warn('XHR failed with exception:', this.responseText);
			
			// TODO Only support the 'error' jquery status for now
			error(this, 'error', this.responseText);
		}
	}
}

// TODO Imply the data type from XHR header
function format(responseText, dataType, xhr) {
	// For data types to be emulated, check http://api.jquery.com/jQuery.ajax/
	switch(dataType) {
		case 'xml':
			console.log('AJAX: XML data type not supported');
			return responseText;
		case 'html':
			return responseText;
		case 'script':
			// TODO Check the error cases; This might be dangerous
			return eval(script);
		case 'json':
			return JSON.parse(responseText);
		case 'jsonp':
			console.log('AJAX: JSONP data type not supported');
			return responseText;
		case 'text':
			return responseText;
		default:
			console.log('AJAX: Not parsing data type', dataType)
			return responeText;
	}
}

/* The minimal, exported Router API */
var AJAX = {
	// TODO Unimplemented API
	ajax: function(options) {
		// TODO Really handle the settings & defaults, now we only care about URL
		var extendedOptions = {};
		_.extend(extendedOptions, options);
		//console.log('Trigger ajax request with options', options);
		
		var xhr = xhr = new XMLHttpRequest();
		xhr.onreadystatechange = _.partial(handleStateChange, extendedOptions);
		xhr.open("GET", options.url);
		xhr.send(null);
	}
};

exports = module.exports = AJAX.ajax;