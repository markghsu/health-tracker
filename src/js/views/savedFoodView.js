var app = app || {};

app.SavedFoodView = Backbone.View.extend({
	tagName: "tr",
	className: "",
	events: {
		"keypress input": "saveOnEnter",
		"click .delete-btn": "delete",
		"dblclick td": "edit",
		"click .edit-btn": "edit",
		"click .save-btn": "saveAndClose",
		"click .cancel-btn": "close"
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
		if(!this.model.get('name')) {
			console.log(this.model);
			this.editAll();
		}
		return this;
	},
	edit: function(e) {
		this.$el.addClass('editing');
		this.$el.find('div').addClass('hide');
		this.$el.find('.save-btn').removeClass('hide');
		this.$el.find('.edit-btn').addClass('hide');
		this.$el.find('.cancel-btn').removeClass('hide');
		this.$el.find('.delete-btn').addClass('hide');
		this.$el.find('input').removeClass('hide');
	},
	editAll: function() {
		this.$el.addClass('editing');
		this.$el.find('div').addClass('hide');
		this.$el.find('input').removeClass('hide');
	},
	saveOnEnter: function(e) {
	/*	if(e.keyCode === 13) {
			this.close();
		}*/
	},
	saveAndClose: function(e) {
		var q = this.$('.qty-input').val().trim();
		var name = this.$('.name-input').val().trim();
		var calories = this.$('.calories-input').val().trim();
		var fat = this.$('.fat-input').val().trim();
		var carbs = this.$('.carbs-input').val().trim();
		var protein = this.$('.protein-input').val().trim();
		if(!isNaN(q) && !isNaN(calories) && !isNaN(fat) && !isNaN(carbs) && !isNaN(protein)){
			if(q == 0) {
				this.delete();
			}
			else {
				this.model.save({
					quantity: q,
					name: name,
					calories:calories,
					fat: fat,
					carbs: carbs,
					protein: protein
				});
			}
		}
		this.close();
	},
	close: function(e) {
		this.$('input').addClass('hide');
		this.$('div').removeClass('hide');
		this.$('.save-btn').addClass('hide');
		this.$('.edit-btn').removeClass('hide');
		this.$('.cancel-btn').addClass('hide');
		this.$('.delete-btn').removeClass('hide');

		this.$el.removeClass('editing');
	},
	delete: function() {
		this.model.destroy({
			success: function(model, response){
			},
			error: function(model, response){
				console.log("ERROR! destroying model:"+response);
			}
		})
	}
});