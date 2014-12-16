MovieModel = require './models/movie'

describe 'ModelTests', ->
  describe 'MovieModel', ->
    it 'should have urlRoot /api/movies/', ->
      movie = new MovieModel()
      movie.urlRoot.should.equal '/api/movies/'
