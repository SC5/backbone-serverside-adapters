var ajax = require('./ajax'),
    _ = require('underscore'),
    deferred = require('underscore.deferred');

// Stub function that does not do much of anything than return the jQuery object
function jQueryStub() {
  return this;
}

var functions = {
      on: jQueryStub,
      off: jQueryStub,
      bind: jQueryStub,
      unbind: jQueryStub,
      delegate: jQueryStub,
      undelegate: jQueryStub,
      live: jQueryStub,
      die: jQueryStub,
      trigger: jQueryStub,
      ready: jQueryStub,
    },
    statics = _.extend({
      ajax: ajax
    }, deferred);


// Cheerio load replacement that takes the new statics into account
function load(oldLoad, statics, str, options) {
  var initialize = oldLoad(str, options);
  _.extend(initialize.__proto__, statics);

  return initialize;
}

function inject(cheerio, extraFunctions, extraStatics) {
  // Curry the load function in particular, so that we will be
  // able to inject the new statics
  var allStatics = _.extend(statics, extraStatics);
  allStatics.load = _.partial(load, cheerio.load, allStatics);

  // Add the base adapters
  _.extend(cheerio.prototype, functions, extraFunctions);

  // Curry the cheerio statics. We also need to tamper cheerio's
  // load function to inject the statics
  _.extend(cheerio, allStatics);
}

exports = module.exports = {
  inject: inject,
  statics: statics,
  functions: functions
}
