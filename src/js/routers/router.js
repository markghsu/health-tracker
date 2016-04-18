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
			console.log("date: " + date);
			app.date = date;
		}
		else {
			console.log("date failure!");
			app.date = Date.today().toString('d-M-yyyy');
		}
		if(app.myView) {
			app.myView.resetDate(app.date);
		}
		$('#current-date').text("Current Date: "+ app.date);
		$('#next-date').attr('href','#/'+ Date.parseExact(app.date,"d-M-yyyy").addDays(1).toString('d-M-yyyy'));
		$('#previous-date').attr('href','#/'+ Date.parseExact(app.date,"d-M-yyyy").addDays(-1).toString('d-M-yyyy'));
	},
});