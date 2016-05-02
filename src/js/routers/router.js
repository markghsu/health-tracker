var app = app || {};

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
			app.myView.resetDate(app.date);
		}
		
	},
});