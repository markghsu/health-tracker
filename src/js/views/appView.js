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
	},
	addSavedFood: function(food) {
		//console.log(food);
		var view = new app.SavedFoodView({ model: food });
		this.savedList.append(view.render().el);
	},
	render: function(food){
		var cals = app.SavedFoods.reduce(function(memo, current){ 
			return current.get('calories') * current.get('quantity') + memo;
		}, 0);
		this.footer.html('Total Calories: '+ cals +" calories");
	}

});