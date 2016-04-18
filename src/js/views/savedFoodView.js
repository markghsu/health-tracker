var app = app || {};

app.SavedFoodView = Backbone.View.extend({
	tagName: "tr",
	className: "",
	events: {
		"keypress input": "saveOnEnter",
		"click .delete": "delete",
		"dblclick td": "edit",
		"blur input": "close"
	},
	initialize: function() {
		this.listenTo(this.model, 'change', this.render);
		this.listenTo(this.model, 'destroy', this.remove);
		this.listenTo(this.model, 'removeView', this.removeView);
	},
	template: _.template($("#saved-template").html()),
	removeView: function() {
		this.stopListening();
		this.remove();
		console.log('removing view for model: ' + this.model.get('name'));
	},
	render: function() {
		this.$el.html(this.template(this.model.attributes));
		return this;
	},
	edit: function(e) {
		this.$el.addClass('editing');
		$(e.currentTarget).children('div').addClass('hide');
		$(e.currentTarget).children('input').removeClass('hide').focus();

	},
	saveOnEnter: function(e) {
		if(e.keyCode === 13) {
			this.close();
		}
	},
	close: function(e) {
		var q = this.$('.qty-input').val().trim();
		var name = this.$('.name-input').val().trim();
		var calories = this.$('.calories-input').val().trim();
		if(!isNaN(q) && !isNaN(calories)){
			if(q == 0) {
				this.delete();
			}
			else {
				this.model.save({'quantity': q, name: name, calories:calories});
			}
		}
		this.$('input').addClass('hide');
		this.$('div').removeClass('hide');
		this.$el.removeClass('editing');
	},
	delete: function() {
		this.model.destroy({
			success: function(model, response){
				//console.log("destroying model:"+response);
			},
			error: function(model, response){
				console.log("ERROR! destroying model:"+response);
			}
		})
	}
});