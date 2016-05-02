var app = app || {};

app.SavedFoodView = Backbone.View.extend({
	tagName: "div",
	className: "saved-food-row fade-in",
	events: {
		"keypress input": "saveOnEnter",
		"click .delete-btn": "delete",
		"dblclick .display": "edit",
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
			this.editAll();
			//open fields for editing
		}
		return this;
	},
	edit: function(e) {
		this.$el.addClass('editing');
		this.$el.find('.display').addClass('hide');
		this.$el.find('.save-btn').removeClass('hide');
		this.$el.find('.edit-btn').addClass('hide');
		this.$el.find('.cancel-btn').removeClass('hide');
		this.$el.find('.delete-btn').addClass('hide');
		this.$el.find('input').removeClass('hide');
	},
	editAll: function() {
		this.$el.addClass('editing');
		this.$el.find('.display').addClass('hide');
		this.$el.find('input').removeClass('hide');
		this.$el.find('.save-btn').removeClass('hide');
		this.$el.find('.edit-btn').addClass('hide');
		this.$el.find('.cancel-btn').removeClass('hide');
		this.$el.find('.delete-btn').addClass('hide');
	},
	saveOnEnter: function(e) {
	},
	saveAndClose: function(e) {
		var q = _.escape(this.$('.qty-input').val().trim());
		var name = _.escape(this.$('.name-input').val().trim());
		var calories = _.escape(this.$('.calories-input').val().trim());
		var fat = _.escape(this.$('.fat-input').val().trim());
		var carbs = _.escape(this.$('.carbs-input').val().trim());
		var protein = _.escape(this.$('.protein-input').val().trim());
		if(q == 0) {
			this.delete();
		}
		else {
			//When model saves, backbone won't return anything if nothing has changed (no sync)
			//As such, we need to check specifically if the save returns false, meaning a validation error
			//if save returns "undefined", that means nothing has changed and we should still close editing mode.
			if(this.model.save({
				quantity: q,
				name: name,
				calories: calories,
				fat: fat,
				carbs: carbs,
				protein: protein
			}) === false) {
				this.$('.error-msg').text(this.model.validationError).removeClass('hide');
			}
			else {
				this.$('.error-msg').addClass('hide');
				this.close();
			}
		}	
	},
	close: function(e) {
		this.$('input').addClass('hide');
		this.$('.display').removeClass('hide');
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