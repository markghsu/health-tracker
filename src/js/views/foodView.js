var app = app || {};

app.FoodView = Backbone.View.extend({
	tagName: "option",
	className: "",
	initialize: function() {
		this.$el.val(this.model.cid);//these aren't saved in firebase, so use CID to find
	},
	template: _.template($("#food-template").html()),
	render: function() {
		this.$el.html(this.template(this.model.attributes));
		return this;
	}
});