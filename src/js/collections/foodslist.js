var app = app || {};

app.FoodsList = Backbone.Firebase.Collection.extend({
	initialize: function(args) {
		this.date = args.date;
	},
	model: app.Food,
	autoSync: false,
	// autoSync causes issues with re-loading a particular food list: the autosyncing leaves events bound.
	url: function(){
		return 'https://blistering-heat-9749.firebaseio.com/foodslist/' + this.date;
	},
	comparator: 'name',
})