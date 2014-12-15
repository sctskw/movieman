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
    frameworks: ['mocha', 'chai'],
    reporters: ["mocha"],
    plugins: [
      "karma-mocha",
      "karma-chai",
      "karma-jquery",
      "karma-chai-jquery",
      "karma-phantomjs-launcher",
      "karma-mocha-reporter",
      "karma-coffee-preprocessor"
    ]
    ,
    files: [
      './tests/clientside/**/*.spec.coffee'
    ],
    browsers: ['PhantomJS']
  });
}
