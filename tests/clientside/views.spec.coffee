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
        {
          title: 'title1',
          year: 2014,
          ratings: {
            audience_score: 100
          },
          posters: {thumbnail: 'blank'}
        },
        {
          title: 'title2',
          year: 1990,
          ratings: {
            audience_score: 90
          },
          posters: {thumbnail: 'blank'}
        }
      ]
      @view.renderMovieCollection(movies)
      items = @view.$el.find('#user-movies .movie-item')
      items.length.should.equal 2

      items.each (idx, item) ->
        title = $(item).find('.movie-title').html()
        title.should.contain(movies[idx].title)




