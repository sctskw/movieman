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

  describe '/api/login', ->
    validUser =
      username: 'austin'
      password: 'cool123'

    missingPassword =
      username: 'austin'

    missingUsername =
      password: 'cool123'

    invalidPassword =
      username: 'austin'
      password: 'this is wrong'

    it 'should sucessfully log in user', (done) ->
      request(app)
      .post('/api/login')
      .expect('Content-Type', /json/)
      .send(validUser)
      .expect(200)
      .end (err, res) ->
        console.log('res.body', res.body)
        if res.body.data.password
          err = new Error 'password should not be on response object'

        done(err)

    it 'missing password should return 400', (done) ->
      request(app)
      .post('/api/login')
      .expect('Content-Type', /json/)
      .send(missingPassword)
      .expect(400, done)

    it 'missing username should return 400', (done) ->
      request(app)
      .post('/api/login')
      .expect('Content-Type', /json/)
      .send(missingUsername)
      .expect(400, done)

    it 'invalid password should return a 400', (done) ->
      request(app)
      .post('/api/login')
      .expect('Content-Type', /json/)
      .send(invalidPassword)
      .expect(400, done)
