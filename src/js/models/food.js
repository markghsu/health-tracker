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
		if(attributes.name == "") {
			return "Error, name of food is required!";
		}
		if(isNaN(attributes.quantity)) {
			return "Error, quantity must be a number";
		}
		if(isNaN(attributes.calories)) {
			return "Error, calories must be a number";
		}
		if(isNaN(attributes.fat)) {
			return "Error, fat must be a number";
		}
		if(isNaN(attributes.carbs)) {
			return "Error, carbohydrates must be a number";
		}
		if(isNaN(attributes.protein)) {
			return "Error, protein must be a number";
		}
		if(attributes.quantity < 0) {
			return "Error, quantity cannot be less than 0";
		}
	}
});