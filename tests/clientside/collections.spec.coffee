BaseCollection = require './collections/base'
MovieCollection = require './collections/movies'
SearchResultCollection = require './collections/searchResults'
UserMovieCollection = require './collections/userMovies'

describe 'CollectionTests', ->

  describe 'BaseCollection', ->
    it '#parse(resp) should return resp.data', ->
      base = new BaseCollection()
      resp = data: 'test'
      base.parse(resp).should.equal 'test'

  describe 'MovieCollection', ->
    beforeEach ->
      @movies = new MovieCollection()
    it 'should have url /api/movies/', ->
      @movies.url.should.equal '/api/movies/'
    it 'should have a model defined', ->
      @movies.model.should.exist

  describe 'SearchResultCollection', ->
    beforeEach ->
      cfg = searchTerm: 'test'
      @searchResults = new SearchResultCollection(cfg)
    it 'should have a model defined', ->
      @searchResults.model.should.exist
    it 'should have a searchTerm', ->
      @searchResults.searchTerm.should.equal 'test'
    it 'should have url /api/movies/search/title/test', ->
      url = '/api/movies/search/title/test'
      @searchResults.url().should.equal url

  describe 'UserMovieCollection', ->
    beforeEach ->
      cfg = user: 'testUser'
      @userMovies = new UserMovieCollection(cfg)
    it 'should have a model defined', ->
      @userMovies.model.should.exist
    it 'should have user testUser', ->
      @userMovies.user.should.equal 'testUser'
    it 'should have url /api/movies/user/testUser', ->
      url = '/api/movies/user/testUser'
      @userMovies.url().should.equal url



