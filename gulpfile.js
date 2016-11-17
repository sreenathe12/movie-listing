var gulp       = require('gulp');
var browserify = require('browserify');
var buffer     = require('vinyl-buffer');
var source     = require('vinyl-source-stream');
var babelify   = require('babelify');
var sourcemaps = require('gulp-sourcemaps');
var uglify     = require('gulp-uglify');
var notify     = require('gulp-notify');
var watchify   = require('watchify');
var gutil      = require('gulp-util');
var cssmin     = require('gulp-cssmin');
var sass       = require('gulp-sass');
var plumber    = require('gulp-plumber');

// fake production
process.env.NODE_ENV = 'production';

var VENDOR = ['alt', 'react', 'react-dom', 'react-router'];
var DIR = './dist';

gulp.task('browserify-vendor', function() {
  return browserify()
    .require(VENDOR)
    .bundle()
    .pipe(source('vendor.min.js'))
    .pipe(buffer())
    .pipe(uglify({ mangle: false }))
    .pipe(gulp.dest(DIR+'/js'));
});

gulp.task('browserify', ['browserify-vendor'], function() {
  return browserify({ entries: './src/js/client.js', debug: true, fullPaths: false })
    .external(VENDOR)
    .transform(babelify, { presets: ['es2015', 'react'] })
    .bundle()
    .pipe(source('client.min.js'))
    .pipe(buffer())
    .pipe(uglify({ mangle: false }))
    .pipe(gulp.dest(DIR+'/js'));
});

gulp.task('browserify-watch', ['browserify-vendor'], function() {
  var bundler = watchify(browserify({ entries: './src/js/client.js', debug: true }, watchify.args));

  bundler.external(VENDOR);
  bundler.transform(babelify, { presets: ['es2015', 'react'] });
  bundler.on('update', rebundle);
  return rebundle();

  function rebundle() {
    var start = Date.now();
    return bundler.bundle()
      .on('error', notify.onError(function(err) {
          return {
            title: 'Gulp Error: browserify-watch',
            message: err.toString()
          }
      }))
      .on('end', function() {
        gutil.log(gutil.colors.green('Finished: ', (Date.now() - start) + 'ms.'));
      })
      .pipe(source('client.min.js'))
      .pipe(buffer())
      .pipe(uglify({ mangle: false }))
      .pipe(gulp.dest(DIR+'/js'));
  }
});

gulp.task('js-libs', function() {
  return gulp.src('./src/js/libs/**/*.js')
    .pipe(gulp.dest(DIR+'/js/libs'));
});

gulp.task('sass', function() {
  return gulp.src('./src/scss/style.scss')
    .pipe(plumber())
    .pipe(
      sass({
        includePaths: ['./node_modules/bootstrap-sass/assets/stylesheets/']
      }).on('error', notify.onError(function(err) {
          return {
            title: 'Gulp Error: SASS',
            message: err.message
          }
      }))
    )
    .pipe(cssmin())
    .pipe(gulp.dest(DIR+'/css'));
});

gulp.task('images', function() {
  return gulp.src('./src/images/**/*')
    .pipe(gulp.dest(DIR+'/images'));
});

gulp.task('fonts', function() {
  return gulp.src('./src/fonts/**/*')
    .pipe(gulp.dest(DIR+'/fonts'));
});

gulp.task('watch', function() {
  gulp.watch('./src/scss/**/*.scss', ['sass']);
});

gulp.task('default', ['build', 'browserify-watch', 'watch']);
gulp.task('build', ['sass', 'browserify', 'images', 'fonts', 'js-libs']);