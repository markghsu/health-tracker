# Health Tracker Application
This application was built as an optional part of Udacity's Front-End Nanodegree Program. It demonstrates use of Backbone as an MV* framework.

## Running the Application
To build, run the default gulp task, which will build a production version of this webpage in the "dist" folder. It will also keep a watch on existing files to rebuild when they are changed. 

To run this app, open the "dist/index.html" webpage in a browser. 

##Technology used
The health tracker uses [Backbone.js](http://backbonejs.org/) as an MV* framework, and [BackboneFire](https://github.com/firebase/backbonefire) as bindings for [Firebase](https://www.firebase.com/) in order to store data. The app uses the [Nutritionix API](https://developer.nutritionix.com/) to pull data for food. It also uses [jQuery](http://jquery.com/) and [Datejs](http://www.datejs.com/) libraries to simplify DOM manipulation, event bindings, and date checking. [Bootstrap](http://getbootstrap.com/) is used for styling and mobile responsiveness. [Gulp](gulpjs.com) is used as a build system.