var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
  urlRoot: '/api/movies/',
  parse: function(resp) {
    return resp.data;
  }
});
