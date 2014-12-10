var _ = require('underscore');
var IndexView = require('./view');

var App = {};

App.start = function(config) {
  var opts = _.extend({}, config);
  new IndexView({el: opts.viewEl || 'body'}).render();
};

module.exports = App;



