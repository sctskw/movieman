var BaseView = require('./base');
var SearchResults = require('../collections/searchResults');
var MovieCollection = require('../collections/movies');
var SearchBar = require('./partials/searchBar');

//templates
var searchViewTpl = require('./templates/search-view.jade');
var searchResultsTpl = require('./templates/search-results.jade');


//create movie collection
var Movies = new MovieCollection();

//Class SearchView
module.exports = BaseView.extend({

  events: {
    "click .favorite": "onFavorite"
  },

  initialize: function(cfg) {
    var self = this;

    //setup configs
    this.initConfigs(cfg);

    //cache search term
    this.searchTerm = cfg.searchTerm;

    //fetch search results
    this.results = new SearchResults({
      searchTerm: this.searchTerm
    });

    //fetch results
    this.results.fetch().then(function(results){
      self.renderSearchResults(results.data);
    });
  },

  //fires when user clicks favorite icon
  onFavorite: function($event) {
    var self = this;

    $event.preventDefault(); //stop href from firing

    //request movie data from api and save it in the collection
    this.$.ajax({
      url: $event.currentTarget.href
    }).done(function(resp) {

      //configure POST data
      var json = resp.data;
      json.user = self.getUserName(); //store username
      json._id = json.id; //rename id tag
      delete json.id; //remove id to allow POST

      //POST movie to db
      Movies.create(json, {
        wait: true,
        success: function() {
          App.routes.navigate('/', true); //redirect to index
        }
      });
    });
  },

  //hide the loading indicator
  stopLoading: function() {
    this.$('#search-loader').hide();
  },

  //show the loading indicator
  startLoading: function() {
    this.$('#search-loader').show();
  },

  renderSearchResults: function(results) {
    //hide the loading indicator
    this.stopLoading();

    //render other partials
    this.renderSearchBar(); //so user can search again

    //render results list
    this.$el.find('#search-results').append(searchResultsTpl({
      searchTerm: this.searchTerm,
      results: results
    }));

  },

  //render partial that is the search input
  renderSearchBar: function() {
    var searchBar = new SearchBar();
    this.$el.prepend(searchBar.render().el);
  },

  //render the view
  render: function() {
    this.$el.html(searchViewTpl({
      searchTerm: this.searchTerm
    }));

    return this;
  }
});
