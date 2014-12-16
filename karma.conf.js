module.exports = function(config) {
  config.set({
    preprocessors: {
      '**/*.coffee': ['coffee'],
      '**/*.jade': ['jade', 'html2js']
    },
    coffeePreprocessor: {
      options: {
        bare: true,
        sourceMap: true
      }
    },

    frameworks: ['mocha', 'chai'],
    reporters: ['mocha'],
    plugins: [
      "karma-browserify",
      "karma-mocha",
      "karma-chai",
      "karma-jquery",
      "karma-chai-jquery",
      "karma-phantomjs-launcher",
      "karma-mocha-reporter",
      "karma-coffee-preprocessor",
      "karma-jade-preprocessor"
    ],

    files: [],

    browsers: ['PhantomJS']
  });
}
