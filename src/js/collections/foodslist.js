var app = app || {};

/**
 * @class Collection representing the foods that are stored for a particular date.
 * @param {string} date Date that this food is stored under
 * Uses Firebase to store foods as a child of the date.
 */
app.FoodsList = Backbone.Firebase.Collection.extend({
	initialize: function(args) {
		this.date = args.date;
	},
	model: app.Food,
	// autoSync causes issues with re-loading a particular date: the autosyncing
	// makes it so that reloading a date doesn't trigger any add events, just syncs.
	autoSync: false,	
	url: function(){
		return 'https://blistering-heat-9749.firebaseio.com/foodslist/' + this.date;
	},
	comparator: 'name',
})