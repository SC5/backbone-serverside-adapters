var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest,
    _ = require('underscore'),
    _deferred = require('underscore.deferred');

// TODO This is the first proto hack and only supports GET
// Implement a full support with other HTTP commands and really $.ajax compliant way
function handleStateChange(deferred, settings) {
  // Initialize the response callbacks
  function nop() { console.log('Dummy XHR callback executed'); }
  var success = typeof(settings.success) === 'function' ? settings.success : nop,
      error = typeof(settings.error) === 'function' ? settings.error : nop,
      data = null;

  // Handle the status; 2XX requests are alright, interpret others as errors for now
  // e.g. following redirects
  if (this.readyState === 4 && this.status >= 200 && this.status < 300 || this.status === 304) {
    try {
      //console.log('XHR completed with status:', this.status);
      data = format(this.responseText, settings.dataType, this)
    } catch (e) {
      console.warn('XHR failed with exception:', this.responseText);

      // TODO Only support the 'error' jquery status for now
      error(this, 'error', this.responseText);
      return deferred.reject();
    }
    success(data, String(this.status), this);
    // TODO Create some sensible text status
    return deferred.resolve(data, String(this.status), this);
  }
  // Handle 4xx-5xx as errors
  if (400 <= this.status && this.status < 600) {
    // TODO Only support the 'error' jquery status for now
    console.warn('XHR failed with error:', this.status, this.responseText);
    error(this, 'error', this.responseText);
    return deferred.reject(this, 'error', this.resposeText);
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
      console.log('AJAX: Not parsing data type', dataType);
      return responeText;
  }
}

/* The minimal, jQuery.ajax implementation */
function ajax(options) {
  // TODO Really handle the settings & defaults, now we only care about URL
  var extendedOptions = _.extend({}, options),
      deferred = _deferred.Deferred(),
      xhr = new XMLHttpRequest();

  xhr.onreadystatechange = _.partial(handleStateChange,
    deferred, extendedOptions);
  xhr.open("GET", options.url);
  xhr.send(null);

  return deferred;
}

exports = module.exports = ajax;
