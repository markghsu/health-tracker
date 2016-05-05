var app = app || {};

/**
 * @class SearchView View to handle food that is searched for
 */
app.SearchView = Backbone.View.extend({
	el: "#search-foods",
	events: {
		'keypress #search-box': 'searchOnEnter',
		'click #search-btn': 'search',
		'click #choose-food': 'chooseFood',
		'click #add-empty': 'addEmpty',
		'change #food-select': 'showSelected',
	},
	selectedTemplate: _.template($('#food-template').html()),
	initialize: function() {
		this.searchBox = this.$('#search-box');
		this.foodSelect = this.$('#food-select');

		this.listenTo(this.collection, 'add', this.addFood);
		this.listenTo(this.collection, 'reset', this.resetFood);
	},
	/**
	 *	@function search Use Nutritionix API to find possible matches for search food.
	 */
	search: function() {
		var val = this.searchBox.val();
		var url = app.searchURL.replace(/searchterm/,encodeURIComponent(val));
		if (val) {
			$('#search-btn').prop('disabled', true).text("loading...");
			var col = this.collection;
			$.getJSON(url, function(data) {
				col.reset();
				//Add foods to collection
				_.each(data.hits, function(val) {
					var fields = val.fields;
					col.add({
						'name': fields.item_name + ' ('+fields.brand_name+')',
						'calories': fields.nf_calories,
						'carbs': fields.nf_total_carbohydrate,
						'protein': fields.nf_protein,
						'fat': fields.nf_total_fat
					});
				});
				$('#choose-food').prop('disabled', false);
				$('#search-error').addClass('hide');
			}).fail(function() {
				$('#search-error').removeClass('hide').text("Error, unable to connect to Nutritionix API. Add custom foods in the meantime.");
			}).always(function(){
				$('#search-btn').prop('disabled', false).text("Search");
			});
		}
		$('#food-select').focus();
	},
	searchOnEnter: function(e) {
		if(e.keyCode === 13) {
			this.search();
		}
	},
	/**
	 *	@function addFood add to select input when model is added to collection
	 */
	addFood: function(food) {
		var view = new app.FoodView({ model: food });
		$('#food-select').append(view.render().el).trigger('change');
	},
	/**
	 *	@function resetFood empty select input
	 */
	resetFood: function() {
		$('#food-select').html("");
	},
	/**
	 *	@function chooseFood add selected food to saved food list
	 */
	chooseFood: function() {
		if(this.foodSelect.val()) {
			app.test = this.collection.get(this.foodSelect.val());
			var mod = app.test.pick('name','calories','fat','protein','carbs');

			//check if the food is already in the list, and if so, just increment the quantity.
			var existing = app.SavedFoods.findWhere(mod);
			if(existing) {
				existing.save({'quantity': existing.get('quantity')+1});
			}
			else {
				app.SavedFoods.create(mod);
			}
		}
	},
	/**
	 * @function addEmpty Add an empty model to the saved food list.
	 */
	addEmpty: function() {
		app.SavedFoods.create({});
	},
	/**
	 *	@function showSelected Show the nutrition info for the selected option
	 *  in the select input
	 */
	showSelected: function(e) {
		if(this.foodSelect.val()) {
			var model = this.collection.get(this.foodSelect.val());
			$('#food-info').html(this.selectedTemplate(model.attributes));
		}
	}
});