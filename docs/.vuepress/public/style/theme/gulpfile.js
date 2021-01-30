// gulpfile.js

var path = require('path')
var gulp = require('gulp')
var cleanCSS = require('gulp-clean-css')
var cssWrap = require('gulp-css-wrap')

// var customThemeName = '.dark-mode'

gulp.task('css-wrap-dark', function() {
  return gulp.src( path.resolve('./dark.css'))
    .pipe(cssWrap({selector: '.dark-mode'}))
    .pipe(cleanCSS())
    .pipe(gulp.dest('./dist'))
})

gulp.task('css-wrap-light', function() {
  return gulp.src( path.resolve('./light.css'))
    .pipe(cssWrap({selector: '.light-mode'}))
    .pipe(cleanCSS())
    .pipe(gulp.dest('./dist'))
})

gulp.task('move-font', function() {
  return gulp.src(['./fonts/**']).pipe(gulp.dest('./dist/fonts'));
});