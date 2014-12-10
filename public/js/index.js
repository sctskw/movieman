var Backbone = require('backbone');
Backbone.$ = require('jquery'); //allow backbone access to jquery

var App = require('./app');
console.log(App);

//when document is ready, start rendering
Backbone.$(function() {
  App.start({viewEl: '#content'});
});



