var app = app || {};

app.AppView = Backbone.View.extend({
	el: "#app",
	totalTemplate: _.template($("#total-template").html()),
	events: {
	},
	initialize: function() {
		this.searchBox = this.$('#search-box');
		this.foodSelect = this.$('#food-select');
		this.savedList = this.$('#saved-list');

    	this.listenTo(app.SavedFoods, 'add', this.addSavedFood);
    	this.listenTo(app.SavedFoods, 'all', this.render);
    	this.listenTo(app.SavedFoods, 'reset', this.addAllSavedFood);

    	app.SavedFoods.fetch();
		$('#date-picker').text(Date.parseExact(app.date,"d-M-yyyy").toString('MMM d, yyyy'));
		$('#next-date').attr('href','#/'+ Date.parseExact(app.date,"d-M-yyyy").addDays(1).toString('d-M-yyyy'));
		$('#previous-date').attr('href','#/'+ Date.parseExact(app.date,"d-M-yyyy").addDays(-1).toString('d-M-yyyy'));
	},
	addSavedFood: function(food) {
		var view = new app.SavedFoodView({ model: food });
		this.savedList.append(view.render().el);
	},
	addAllSavedFood: function() {
		app.SavedFoods.each(this.addSavedFood, this);
	},
	render: function(e) {
		var totals = app.SavedFoods.reduce(function(memo, current){
			var qty = current.get('quantity');
			return {
				calories: current.get('calories') * qty + memo.calories,
				carbs: current.get('carbs') * qty + memo.carbs,
				fat: current.get('fat') * qty + memo.fat,
				protein: current.get('protein') * qty + memo.protein,
			}
		}, {
			calories:0,
			carbs: 0,
			fat: 0,
			protein: 0,
		});

		$('#totals').html(this.totalTemplate(_.mapObject(totals, 
			function(val, key){
				return Math.round(val);
			})
		));
	},
	resetDate: function(date) {

		this.stopListening();
		this.savedList.html("");
		app.SavedFoods.off();
		app.SavedFoods.each(function(mod){
			mod.off();
			mod.trigger('removeView');
		}, this);

		app.SavedFoods = new app.FoodsList({date: date});

    	this.listenTo(app.SavedFoods, 'add', this.addSavedFood);
    	this.listenTo(app.SavedFoods, 'all', this.render);
    	this.listenTo(app.SavedFoods, 'reset', this.addAllSavedFood);

    	app.SavedFoods.fetch();

    	dateV = Date.parseExact(date,"d-M-yyyy");
		$('#date-picker').text(Date.parseExact(app.date,"d-M-yyyy").toString('MMM d, yyyy'));
		$('#next-date').attr('href','#/'+ Date.parseExact(date,"d-M-yyyy").addDays(1).toString('d-M-yyyy'));
		$('#previous-date').attr('href','#/'+ Date.parseExact(date,"d-M-yyyy").addDays(-1).toString('d-M-yyyy'));
	}

});