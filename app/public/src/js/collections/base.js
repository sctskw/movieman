var Backbone = require('backbone');

module.exports = Backbone.Collection.extend({

  //default response handler
  parse: function(resp, opts) {
    return resp.data;
  }

});
