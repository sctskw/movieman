var BaseView = require('./base');
var SearchResults = require('../collections/searchResults');
var MovieCollection = require('../collections/movies');

//create collection
var Movies = new MovieCollection();

module.exports = BaseView.extend({

  events: {
    "click .favorite": "onFavorite"
  },

  initialize: function(cfg) {
    var self = this;

    //setup configs
    this.initConfigs(cfg);

    this.searchTerm = cfg.searchTerm;

    //fetch search results
    this.results = new SearchResults({
      searchTerm: this.searchTerm
    });

    //fetch results
    this.results.fetch().then(function(results){
      self.renderSearchResults(results);
    });
  },

  onFavorite: function($event) {
    var self = this;

    $event.preventDefault(); //stop href from firing
    var href = $event.currentTarget.href; //data url

    console.log(this);

    //request movie data from api and save it in the collection
    this.$.ajax({
      url: href
    }).done(function(json) {
      json.user = self.getUser().name;
      json._id = json.id;
      delete json.id;
      Movies.create(json);
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
    var html = this.$html('#tpl-search-results');
    var template = this.$tpl(html);

    //hide the loading indicator
    this.stopLoading();

    //render results list
    this.$('#search-results').append(template({
      searchTerm: this.searchTerm,
      results: results
    }));


  },

  render: function() {
    var html = this.$html('#tpl-search-view');
    var template = this.$tpl(html);

    this.$el.html(template({
      searchTerm: this.searchTerm
    }));

    return this;
  }
});
