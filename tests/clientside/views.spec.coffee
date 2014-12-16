BaseView = require './views/base'
IndexView = require './views/index'
UserMovies = require './collections/userMovies'

describe 'View Tests', ->

  describe 'BaseView', ->
    beforeEach ->
      cfg = user:
        id: 1
        username: 'testUser'
      @view = new BaseView(cfg)

    it '#getUser() should return user object', ->
      user = @view.getUser()
      user.should.exist
      user.username.should.equal 'testUser'
      user.id.should.equal 1

    it '#getUserName() should return testUser', ->
      user = @view.getUserName()
      user.should.equal 'testUser'

  describe 'IndexView', ->
    beforeEach ->
      @view = new IndexView({el: 'body', viewEl: '#content'})

    it 'should have a movie collection', ->
      @view.movies.should.exist
      @view.movies.should.be.instanceof(UserMovies)

    it 'should render movie list', ->
      movies = [
        {title: 'title1'},
        {title: 'title2'}
      ]
      # console.log(@view.$('#tpl-header'))
      # console.log(@view.$el.find('#user-movies'))


