var app = app || {};
/**
 * @class Router for Application.
 * Uses the date in d-MM-yyyy format to route to the correct day and foodlist.
 * Utilizes Datejs library to handle date checking and updating.
 */
var Workspace = Backbone.Router.extend({
	routes: {
		"*date": "date",
	},
	date: function(date) {
		var myDate;
		if(date){
			date = date.trim();
		}
		if(Date.parseExact(date,"d-M-yyyy")) {
			app.date = date;
		}
		else {
			app.date = Date.today().toString('d-M-yyyy');
		}
		if(app.myView) {
			//If the app has already been initialized, then this view will exist.
			//If this view exists, we need to reset the date and propagate any changes
			//to the foodlist/etc that is being displayed on screen
			app.myView.resetDate(app.date);
		}
		
	},
});