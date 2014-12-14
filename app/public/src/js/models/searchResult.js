var BaseModel = require('./base');

module.exports = BaseModel.extend({
  url: function() {
    return '/api/movies/search/id/' + this.id;
  }
});
