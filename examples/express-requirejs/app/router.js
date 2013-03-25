define([
	'jquery', 'backbone', 'underscore',
	'./views/master', './views/details',
	'./collections/items',
	'module'],
	function($, Backbone, _,
		MasterView, DetailsView,
		ItemsCollection, module) {
	console.log('Loading router');
	return Backbone.Router.extend({
		selector: '#main',
		state: null,
		
		routes: {
			// These routes are the 'app level pages' that do not necessarily map
			// one-to-one with views
			'':  'item',
			'items/:item': 'item'
		},
		
		items: new ItemsCollection(),
		
		views: {
			master: null,
			details: null
		},
		
		initialize: function(options) {
			console.log('Router initializing', options);
			
			// Create the views so that they won't need to be re-created and append
			// to DOM; Hide them by default
			this.views.master = new MasterView({ collection: this.items });
			this.views.details = new DetailsView({ collection: this.items });
			
			// Append them to DOM root
			$(this.selector)
				.html(this.views.master.$el)
				.append(this.views.details.$el);
				
			// We somehow need to handle the async messaging of Backbone.
			// In this case, Router is the single instance that knows when everything
			// is done and can emit the change when needed. In this particular case
			// we monitor the changes to views. In case any of them is pending, we are
			// pending. In other cases, we emit that we are done.
			this.views.master.on('stateChange', _.bind(this.handleStateChange, this));
			this.views.details.on('stateChange', _.bind(this.handleStateChange, this));
		},
		
		item: function(item) {
			// Denote we're pending and then do the fetch that will make us pending.
			this.toggleState('pending');
			
			// Tell the details view which model to render
			this.views.details.item = item;
			this.items.fetch();
		},
		
		handleStateChange: function(object, newState, oldState) {
			// We're done when every view is done
			if (this.views.master.state === 'ready' && this.views.details.state === 'ready') {
				return this.toggleState('ready');
			}
			
			// We've got an error if any view has an error
			if (this.views.master.state === 'error' || this.views.details.state === 'error') {
				return this.toggleState('error');
			}
			
			// Otherwise we're still pending
			this.toggleState('pending');
		},
		
		toggleState: function(newState) {
			// Sanity check
			if (this.state === newState) {
				return;
			}
			
			console.log('Router state changed', this.state, newState);
			var oldState = this.state;
			this.state = newState;
			this.trigger('stateChange', this, newState, oldState);
			
			// Just in case the state is 'ready' or 'error', send also the simplified form
			if (newState === 'ready' || newState === 'error') {
				this.trigger('done', this, newState);
			}
		}
	});
});