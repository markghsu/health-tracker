var app = app || {};

/**
 *	@class FoodView view for displaying a food as returned by Nutritionix API
 *  Displays within a select box.
 */
app.FoodView = Backbone.View.extend({
	tagName: "option",
	className: "",
	initialize: function() {
		this.$el.val(this.model.cid);//these aren't saved in firebase, so use CID to find
	},
	template: _.template('<%= name %>'),
	render: function() {
		this.$el.html(this.template(this.model.attributes));
		return this;
	}
});