var app = app || {};

app.Food = Backbone.Model.extend({
	initialize: function(obj) {
	},
	defaults: {
		name: "",
		calories: 0,
		fat: 0,
		carbs: 0,
		protein: 0,
		quantity: 1
	},
	validate: function(attributes){
		if(attributes.quantity < 0) {
			return "Error, quantity cannot be less than 0";
		}
	}
});