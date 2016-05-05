var app = app || {};

/**
 * @class Collection representing the foods that are available to be added to the food list
 * Populated by call to Nutritionix API
 */
app.AvailFoods = Backbone.Collection.extend({
  model: app.Food,
})