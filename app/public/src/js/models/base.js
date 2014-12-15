var Backbone = require('backbone');

//Class BaseModel
module.exports = Backbone.Model.extend({
  //default response handler
  parse: function(resp) {
    return resp.data;
  }
});
