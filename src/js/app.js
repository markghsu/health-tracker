var app = app || {};
app.searchURL = "https://api.nutritionix.com/v1_1/search/searchterm?fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories&appId=84122b41&appKey=043ae02bdddd4f43ea1ace2f688931c5"
app.appId = "84122b41";
app.appKey = "043ae02bdddd4f43ea1ace2f688931c5";

$(function(){
	app.Router = new Workspace();
	Backbone.history.start();
	app.SavedFoods = new app.FoodsList({date: app.date});
	app.myView = new AppView();
	app.searchview = new SearchView({collection: new app.AvailFoods()});
});