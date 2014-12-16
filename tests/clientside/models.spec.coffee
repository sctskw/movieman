BaseModel = require './models/base'
MovieModel = require './models/movie'
SearchResultModel = require './models/searchResult'

describe 'ModelTests', ->

  describe 'BaseModel', ->
    it '#parse(resp) should return resp.data', ->
      model = new BaseModel()
      resp = data: 'test'
      model.parse(resp).should.equal 'test'

  describe 'MovieModel', ->
    beforeEach ->
      @movie = new MovieModel()
    it 'should extend BaseModel', ->
      @movie.should.be.an.instanceof(BaseModel)
    it 'should have urlRoot /api/movies/', ->
      @movie.urlRoot.should.equal '/api/movies/'

  describe 'SearchResultModel', ->
    beforeEach ->
      cfg = id: 1
      @model = new SearchResultModel(cfg)
    it 'should extend BaseModel', ->
      @model.should.be.an.instanceof(BaseModel)
    it '#url() should return /api/movies/search/id/1', ->
      @model.url().should.equal '/api/movies/search/id/1'
