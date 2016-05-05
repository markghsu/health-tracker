var app = app || {};

//Since we're accessing API through front-end, we can't hide appId/key
app.searchURL = "https://api.nutritionix.com/v1_1/search/searchterm?fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2Cnf_total_fat%2Cnf_total_carbohydrate%2Cnf_protein&appId=84122b41&appKey=043ae02bdddd4f43ea1ace2f688931c5"
app.appId = "84122b41";
app.appKey = "043ae02bdddd4f43ea1ace2f688931c5";

$(function(){
	//initialize Router
	app.Router = new Workspace();
	Backbone.history.start();
	//Router has set the app date, now use it to load collection
	app.SavedFoods = new app.FoodsList({date: app.date});
	app.myView = new app.AppView();
	app.searchview = new app.SearchView({collection: new app.AvailFoods()});
});