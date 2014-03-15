var _ = require('underscore'),
    history = require('./history');

function inject(Backbone) {
  // Shim the Backbone missing parts
  _.extend(Backbone.history, history);
}

exports = module.exports = {
  inject: inject,
  history: history
};
