var app = app || {};

var SearchView = Backbone.View.extend({
	el: "#search-foods",
	events: {
		'keypress #search-box': 'searchOnEnter',
		'click #search-btn': 'search',
		'click #choose-food': 'chooseFood',
	},
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
				col.reset(
					//_.pick(data.hits,{'name': fields.item_name,'calories':fields.nf_calories})
					);
				_.each(data.hits, function(val) {
					var fields = val.fields;
					col.add({'name': fields.item_name + ' ('+fields.brand_name+')','calories':fields.nf_calories});
				});
			});
		}
	},
	searchOnEnter: function(e) {
		if(e.keyCode === 13) {
			this.search();
		}
	},
	addFood: function(food) {
		var view = new app.FoodView({ model: food });
		$('#food-select').append(view.render().el);
	},
	resetFood: function() {
		$('#food-select').html("");
	},
	chooseFood: function() {
		app.test = this.collection.get(this.foodSelect.val());
		var mod = app.test.pick('name','calories');
		var existing = app.SavedFoods.findWhere(mod);
		if(existing) {
			existing.set({'quantity': existing.get('quantity')+1});
		}
		else {
			app.SavedFoods.create(mod);
		}
	}
});