var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
  url: function() {
    return '/api/movies/search/id/' + this.id;
  },

  parse: function(resp) {
    return resp.data;
  }
});
