define(['backbone', 'underscore', 'module'], function(Backbone, _, module) {
	
	return Backbone.Collection.extend({
		state: 'init',
		// Fetch the URL from config
		url: module.config().url,
		
		initialize: function() {
			// Automatically update the model state when such comes
			this.on('all', _.bind(this.handleEvent, this));
		},
		
		handleEvent: function(event) {
			var newState,
				oldState = this.state;
				
			switch(event) {
				case 'reset':
				case 'sync':
					newState = 'ready';
					break;
				case 'request':
					newState = 'pending';
					break;
				case 'error':
					newState = 'error';
					break;
				case 'stateChange':
					// Don't handle this one
					return;
				default:
					newState = 'pending';
			}
			
			// Sanity check
			if (this.state === newState) {
				return;
			}
			
			// Change the state
			console.log('Items state changed', this.state, newState);
			this.state = newState;
			this.trigger('stateChange', this, this.state, oldState);
		}
	});
});