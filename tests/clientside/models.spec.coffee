BaseModel = require './models/base'
MovieModel = require './models/movie'
SearchResultModel = require './models/searchResult'

describe 'ModelTests', ->
  describe 'BaseModel', ->
    it '#parse(resp) should return resp.data'. ->
      model = new BaseModel()
      resp =
        data: 'test'

      model.parse(resp).should.equal 'test'
  describe 'MovieModel', ->
    it 'should have urlRoot /api/movies/', ->
      movie = new MovieModel()
      movie.urlRoot.should.equal '/api/movies/'
