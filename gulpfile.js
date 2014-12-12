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
  'test': {
    src: 'tests/*.coffee',
    runner: {
      exec: plugins.mocha,
      config: {
        reporter: 'spec'
      }
    },
    watch: {
      src: [
        'tests/**/*.coffee',
        'lib/**/*.js'
      ],
      exec: [
        'test'
      ]
    }
  },

  browserify: {
    src: 'public/js/app.js',
    dest: 'public/dist',
    options: {
      insertGlobals: true,
      debug: false
    },
    watch: {
      src: ['public/js/**/*.js'],
      exec: ['bundle']
    }
  },

  less: {
    src: './public/styles/app.less',
    dest: './public/dist/',
    options: {
      paths: [
        'public/styles'
      ],
      filename: 'styles.css'
    },
    watch: {
      src: './public/styles/**/*.less',
      exec: ['css']
    }
  },

  scripts: {
    src: 'public/js/**/*.js',
    filename: 'app.js',
    dest: 'public/dist',
    options: {

    },

    watch: {
      src: 'public/js/**/*.js',
      exec: ['js']
    }
  }
};

gulp.task('default', function() {
  gulp.run('test');
  gulp.run('watch');
});

gulp.task('test', function() {
  return gulp.src(src.test.src, {read: false})
    .pipe(src.test.runner.exec(src.test.runner.config));
    // .on('error',  gutil.log);
});

gulp.task('bundle', function() {
  return gulp.src(src.browserify.src)
    .pipe(plugins.browserify(src.browserify.options))
    .pipe(plugins.rename('app.js'))
    .pipe(gulp.dest('public/dist/'));
});

gulp.task('js', function() {
  return gulp.src(src.scripts.src)
    .pipe(plugins.concat(src.scripts.filename))
    .pipe(gulp.dest(src.scripts.dest));
});

gulp.task('css', function() {
  return gulp.src(src.less.src)
    .pipe(plugins.less(src.less.options))
    .pipe(gulp.dest(src.less.dest));
});

gulp.task('watch', ['bundle'], function() {
  gulp.watch(src.test.watch.src, src.test.watch.exec);
  gulp.watch(src.less.watch.src, src.less.watch.exec);
  // gulp.watch(src.scripts.watch.src, src.scripts.watch.exec);
  gulp.watch(src.browserify.watch.src, src.browserify.watch.exec);
});

