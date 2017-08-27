var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');

gulp.task('styles', function () {
  gulp
    .src('./src/index.scss')
    .pipe(sass())
    .pipe(rename('app.css'))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['styles']);