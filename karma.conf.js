module.exports = function(config) {
  config.set({
    preprocessors: {
      '**/*.coffee': ['coffee']
    },
    coffeePreprocessor: {
      options: {
        bare: true,
        sourceMap: true
      }
    },

    frameworks: ['mocha', 'chai', 'browserify'],
    reporters: ['mocha'],
    plugins: [
      "karma-browserify",
      "karma-mocha",
      "karma-chai",
      "karma-jquery",
      "karma-chai-jquery",
      "karma-phantomjs-launcher",
      "karma-mocha-reporter",
      "karma-coffee-preprocessor"
    ],

    files: [
      './app/globals.js'
    ],

    browsers: ['PhantomJS']
  });
}
