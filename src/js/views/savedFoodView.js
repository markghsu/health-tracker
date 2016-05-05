var app = app || {};
/**
 * @class SavedFoodView View to handle food that is saved in the foodlist
 */
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
	/**
	 * @function removeView when model is deleted, stop listening and remove
	 */
	removeView: function() {
		this.stopListening();
		this.remove();
		//console.log('removing view for model: ' + this.model.get('name'));
	},
	/**
	 * @function render Display the food's info within the table.
	 * the template for this includes input fields for editing
	 */
	render: function() {
		this.$el.html(this.template(this.model.attributes));
		if(!this.model.get('name')) {
			this.edit();
			//open fields for editing
		}
		return this;
	},
	/**
	 * @function edit Shows all input fields and hides display fields
	 */
	edit: function(e) {
		this.$el.addClass('editing');
		this.$el.find('.display').addClass('hide');
		this.$el.find('.save-btn').removeClass('hide');
		this.$el.find('.edit-btn').addClass('hide');
		this.$el.find('.cancel-btn').removeClass('hide');
		this.$el.find('.delete-btn').addClass('hide');
		this.$el.find('input').removeClass('hide');
	},
	/**
	 * @function saveOnEnter save all fields when Enter key is pressed
	 */
	saveOnEnter: function(e) {
		if(e.keyCode === 13) {
			this.saveAndClose();
		}
	},
	/**
	 * @function saveAndClose Attempt to save values to model
	 * if successful, hide input fields and show new values
	 * otherwise, display errors.
	 */
	saveAndClose: function(e) {
		//Need to escape everything since we are outputing it to screen
		var q = _.escape(this.$('.qty-input').val().trim());
		var name = _.escape(this.$('.name-input').val().trim());
		var calories = _.escape(this.$('.calories-input').val().trim());
		var fat = _.escape(this.$('.fat-input').val().trim());
		var carbs = _.escape(this.$('.carbs-input').val().trim());
		var protein = _.escape(this.$('.protein-input').val().trim());
		//if quantity is 0, remove
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
				protein: protein,
				saved: true
			}) === false) {
				//Show both an inline error message (useful for mobile) and a global error message
				this.$('.inline-error-msg').text(this.model.validationError).removeClass('hide');
				$('#global-error-msg').text(this.model.validationError).removeClass('hide');
			}
			else {
				this.close();
			}
		}	
	},
	/**
	 * @function close Stop showing all input fields and buttons, and instead display values
	 * if model has never been saved, remove view, as the cancel button has been pressed prior to save.
	 */
	close: function() {
		if(this.model.get("saved")) {
			this.$('input').addClass('hide');
			this.$('.display').removeClass('hide');
			this.$('.save-btn').addClass('hide');
			this.$('.edit-btn').removeClass('hide');
			this.$('.cancel-btn').addClass('hide');
			this.$('.delete-btn').removeClass('hide');
			this.$('.inline-error-msg').addClass('hide');
			$('#global-error-msg').addClass('hide');
			this.$el.removeClass('editing');
		}
		else {
			$('#global-error-msg').addClass('hide');
			this.remove();
		}
	},
	/**
	 * @function delete Attempt to destroy model
	 */
	delete: function() {
		this.model.destroy({
			success: function(model, response){
				$('#global-error-msg').addClass('hide');
			},
			error: function(model, response){
				//console.log("ERROR! destroying model:"+response);
				$('#global-error-msg').text("Error destroying model: "+response).removeClass('hide');
			}
		})
	}
});