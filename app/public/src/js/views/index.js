var BaseView = require('./base');
var UserMovies = require('../collections/userMovies');
var SearchBar = require('../views/searchBar');

module.exports = BaseView.extend({

  initialize: function(cfg) {
    var self = this;

    this.initConfigs(cfg);

    var user = this.getUser().name;

    this.movies = new UserMovies({user: user});

    this.movies.fetch().done(function(results) {
      self.renderMovieCollection(results.data);
    });
  },

  renderMovieCollection: function(movies) {
    var html = this.$html('#tpl-user-movie-collection');
    var template = this.$tpl(html);
    this.$el.append(template({movies: movies}));
    return this;
  },

  renderSearch: function() {
    var search = new SearchBar();
    this.$el.append(search.render().el);
  },

  render: function() {
    this.renderSearch();

    // var user = this.getUser();
    // var template = this.$tpl(this.$html('#tpl-welcome-banner'));
    // this.$el.html(template({name: user.name}));
    return this;
  }
});
