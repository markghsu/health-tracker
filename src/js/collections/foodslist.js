var app = app || {};

app.FoodsList = Backbone.Firebase.Collection.extend({
	model: app.Food,
	url: "https://blistering-heat-9749.firebaseio.com/foodslist",
	autoSync: true,
	comparator: 'name'
})