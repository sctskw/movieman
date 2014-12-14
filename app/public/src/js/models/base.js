var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
  //default response handler
  parse: function(resp) {
    return resp.data;
  }
});
