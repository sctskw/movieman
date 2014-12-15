var Model = require('./models/movie');


describe('MovieModel', function() {
  it('should have urlRoot /api/movies/', function() {
    var movie = new Model();
    expect(movie.urlRoot).to.equal('/api/movies/');
  })
});
