var BaseView = require('./base');
var UserMovies = require('../collections/userMovies');
var SearchBar = require('./partials/searchBar');

//Class IndexView
//
module.exports = BaseView.extend({

  initialize: function(cfg) {
    var self = this;

    //cache configs
    this.initConfigs(cfg);

    //get username
    var user = this.getUserName();

    //create movie collection
    this.movies = new UserMovies({user: user});

    //fetch user movies and render results
    this.movies.fetch().done(function(results) {
      self.renderMovieCollection(results.data);
    });
  },

  //populate list of movies
  renderMovieCollection: function(movies) {
    var html = this.$html('#tpl-user-movie-collection');
    var template = this.$tpl(html);
    this.$el.append(template({movies: movies}));
    return this;
  },

  //render search form
  renderSearch: function() {
    var search = new SearchBar();
    this.$el.append(search.render().el);
  },

  //render view
  render: function() {
    this.renderSearch();
    return this;
  }
});
