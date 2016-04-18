var app = app || {};

var AppView = Backbone.View.extend({
	el: "#app",
	events: {
	},
	initialize: function() {
		this.searchBox = this.$('#search-box');
		this.foodSelect = this.$('#food-select');
		this.savedList = this.$('#saved-list');
		this.footer = this.$('footer');

    	this.listenTo(app.SavedFoods, 'add', this.addSavedFood);
    	this.listenTo(app.SavedFoods, 'all', this.render);
    	this.listenTo(app.SavedFoods, 'reset', this.addAllSavedFood);
    	app.SavedFoods.fetch();
	},
	addSavedFood: function(food) {
		//console.log(food);
		var view = new app.SavedFoodView({ model: food });
		this.savedList.append(view.render().el);
	},
	addAllSavedFood: function() {
		console.log('resetting');
		app.SavedFoods.each(this.addSavedFood, this);
	},
	render: function(e) {
		console.log(e);
		var cals = app.SavedFoods.reduce(function(memo, current){ 
			return current.get('calories') * current.get('quantity') + memo;
		}, 0);
		this.footer.html('Total Calories: '+ cals +" calories");
	},
	resetDate: function(date) {
		this.stopListening();
		this.savedList.html("");
		app.SavedFoods.off();
		app.SavedFoods.each(function(mod){
			mod.off();
			mod.trigger('removeView');
		}, this);
		app.SavedFoods = null;

		app.SavedFoods = new app.FoodsList({date: app.date});
		app.SavedFoods.fetch();

    	this.listenTo(app.SavedFoods, 'add', this.addSavedFood);
    	this.listenTo(app.SavedFoods, 'all', this.render);
    	this.listenTo(app.SavedFoods, 'reset', this.addAllSavedFood);

    	//this.addAllSavedFood();
	}

});