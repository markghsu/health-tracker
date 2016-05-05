var app = app || {};

/**
 * @class AppView application view controlling the Food List
 */
app.AppView = Backbone.View.extend({
	el: "#app",
	//template for displaying total calories, etc.
	totalTemplate: _.template($("#total-template").html()),
	events: {
	},
	/**
	 * @function initialize
	 * Adds listeners to collection (app.SavedFoods), sets dates, loads collection
	 */
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
	/**
	 * @function addSavedFood
	 * add a new SavedFoodView and render it to the list
	 */
	addSavedFood: function(food) {
		var view = new app.SavedFoodView({ model: food });
		this.savedList.append(view.render().el);
	},
	addAllSavedFood: function() {
		app.SavedFoods.each(this.addSavedFood, this);
	},
	/**
	 * @function render
	 * Calculate totals and display them
	 */
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
	/**
	 * @function resetDate
	 * Remove listeners from current foodlist and load the one from the new date
	 */
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

		$('#date-picker').text(Date.parseExact(app.date,"d-M-yyyy").toString('MMM d, yyyy'));
		$('#next-date').attr('href','#/'+ Date.parseExact(date,"d-M-yyyy").addDays(1).toString('d-M-yyyy'));
		$('#previous-date').attr('href','#/'+ Date.parseExact(date,"d-M-yyyy").addDays(-1).toString('d-M-yyyy'));
	}

});