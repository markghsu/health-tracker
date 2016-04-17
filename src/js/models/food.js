var app = app || {};

app.Food = Backbone.Model.extend({
	initialize: function() {
		//console.log('intializing Food model');
	},
	defaults: {
		name: "emptyfood",
		calories: 0,
		quantity: 1
	},
	validate: function(attributes){
		if(attributes.quantity < 0) {
			return "Error, quantity cannot be less than 0";
		}
	}
});