request = require 'supertest'
app = require __basedir + 'app'


describe 'API Tests', ->
  describe '/api/movies/search/title/:title', ->
    it 'should return data', (done) ->
      request(app)
        .get('/api/movies/search/title/ducks')
        .expect('Content-Type', /json/)
        .expect(200)
        .end (err, res) ->
          res.body.data.should.exist
          res.body.data.length.should.be.above(0)
          done()

  describe '/api/movies/search/id/:id', ->
    it 'should return data', (done) ->
      request(app)
        .get('/api/movies/search/id/11369')
        .expect('Content-Type', /json/)
        .expect(200)
        .end (err, res) ->
          res.body.data.should.exist
          res.body.data.should.be.type('object')
          done()
