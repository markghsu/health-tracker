var app = app || {};

var SearchView = Backbone.View.extend({
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
	search: function() {
		var val = this.searchBox.val();
		var url = app.searchURL.replace(/searchterm/,encodeURIComponent(val));
		console.log(url);
		if (val) {
			var col = this.collection;
			$.getJSON(url, function(data) {
				col.reset();
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

			});
		}
		$('#food-select').focus();
	},
	searchOnEnter: function(e) {
		if(e.keyCode === 13) {
			this.search();
		}
	},
	addFood: function(food) {
		var view = new app.FoodView({ model: food });
		$('#food-select').append(view.render().el).trigger('change');
	},
	resetFood: function() {
		$('#food-select').html("");
	},
	chooseFood: function() {
		if(this.foodSelect.val()) {
			app.test = this.collection.get(this.foodSelect.val());
			var mod = app.test.pick('name','calories','fat','protein','carbs');
			var existing = app.SavedFoods.findWhere(mod);
			if(existing) {
				existing.save({'quantity': existing.get('quantity')+1});
			}
			else {
				app.SavedFoods.create(mod);
			}
		}
	},
	addEmpty: function() {
		app.SavedFoods.create({});
	},
	showSelected: function(e) {
		if(this.foodSelect.val()) {
			var model = this.collection.get(this.foodSelect.val());
			$('#food-info').html(this.selectedTemplate(model.attributes));
		}
	}
});