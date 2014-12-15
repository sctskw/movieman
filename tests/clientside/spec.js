var Model = require('./models/movie');


describe('some test', function() {
  it('should pass', function() {
    var movie = new Model();
    expect(movie.urlRoot).to.equal('/api/movies/');
  })
});
