var app = app || {};

app.AvailFoods = Backbone.Collection.extend({
  model: app.Food,
  //no storage, force to ping nutrition API everytime.
  
})