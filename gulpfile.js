var gulp = require('gulp');
var gutil = require('gulp-util');
var path = require('path');
var coffee = require('coffee-script/register');


//autoload plugins from node_modules
var plugins = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'gulp.*'],
  replaceString: /\bgulp[\-.]/
});

var src = {
  test: {
    src: 'tests/serverside/**/*.coffee',
    runner: {
      exec: plugins.mocha,
      globals: {
        global: require('./app/globals'),
        should: require('should')
      },
      config: {
        reporter: 'spec'
      }
    },
    client: {
      files: './tests/clientside/all.tests.js',
      srcFiles: ['./tests/clientside/**/*.coffee'],
      destFile: 'all.tests.js',
      destFolder: './tests/clientside/',
      karma: {
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
      },
      exec: ['concat:tests']
    },
    watch: {
      src: [
        'tests/**/*.coffee'
      ],
      exec: ['test']
    }
  },

  browserify: {
    src: './app/public/src/js/app.js',
    destFolder: './app/public/dist/',
    destFilename: 'app.js',
    options: {
      insertGlobals: true,
      debug: false
    },
    test: {
      destFilename: 'app.test.js',
      options: {
        insertGlobals: true,
        debug: true
      }
    },
    watch: {
      src: [
      'app/public/src/js/**/*.js',
      'app/public/src/js/views/templates/**/*.jade'
      ],
      exec: ['bundle']
    }
  },

  fonts: {
    src: [
      './app/public/vendor/bootstrap/fonts/*',
      './app/public/vendor/fontawesome/fonts/*'
    ],

    dest: 'app/public/dist/fonts',

    options: {
      prefix: 5
    }
  },

  less: {
    src: './app/public/src/styles/app.less',
    dest: './app/public/dist/',
    options: {
      paths: [
        'app/public/styles'
      ],
      filename: 'styles.css'
    },
    watch: {
      src: './app/public/src/styles/**/*.less',
      exec: ['css']
    }
  },

  server: {
    options: {
      script: './app/bin/www',
      ext: 'jade js less',
      ignore: ['./app/public/dist/**/*.js']
    }
  }
};

gulp.task('default', ['test', 'build']);
gulp.task('build', ['fonts', 'css', 'bundle']);
gulp.task('test', function(done) {
  var runSequence = require('run-sequence').use(gulp);
  runSequence('test:server', 'test:client', done);
});

gulp.task('concat:tests', function() {
  return gulp.src(src.test.client.srcFiles)
    .pipe(plugins.coffee({bare: true}))
    .pipe(plugins.concat(src.test.client.destFile))
    .pipe(gulp.dest(src.test.client.destFolder));
});

gulp.task('test:client', ['concat:tests'], function() {
  //clientside tests
  return gulp.src([src.browserify.src, src.test.client.files])
    .pipe(plugins.browserify(src.browserify.test.options))
    .pipe(plugins.rename(src.browserify.test.destFilename))
    .pipe(gulp.dest(src.browserify.destFolder))
    .pipe(plugins.karma(src.test.client.karma))
    .on('error', function(err) {
      throw err;
    });
});

gulp.task('test:server', function(done) {
  //serverside test
  return gulp.src(src.test.src, {read: false})
    .pipe(src.test.runner.exec(src.test.runner.config));
});


gulp.task('bundle', function() {
  return gulp.src(src.browserify.src)
    .pipe(plugins.browserify(src.browserify.options))
    .pipe(plugins.rename(src.browserify.destFilename))
    .pipe(gulp.dest(src.browserify.destFolder));
});

gulp.task('css', function() {
  return gulp.src(src.less.src)
    .pipe(plugins.less(src.less.options))
    .pipe(gulp.dest(src.less.dest));
});

gulp.task('fonts', function() {
  return gulp.src(src.fonts.src)
    .pipe(plugins.copy(src.fonts.dest, src.fonts.options))
});

gulp.task('server', function() {
  return plugins.nodemon(src.server.options)
    .on('restart', function() {
      console.log('refreshing server');
    });
});

gulp.task('watch', ['bundle'], function() {
  gulp.watch(src.test.watch.src, src.test.watch.exec);
  gulp.watch(src.less.watch.src, src.less.watch.exec);
  gulp.watch(src.browserify.watch.src, src.browserify.watch.exec);
  gulp.watch(src.test.client.files, src.test.client.exec);
});


