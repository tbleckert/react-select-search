var gulp   = require('gulp'),
    babel  = require('gulp-babel'),
    rename = require('gulp-rename');

gulp.task('default', function () {
  return gulp.src('src/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist'));
});