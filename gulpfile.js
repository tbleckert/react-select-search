var gulp   = require('gulp'),
    babel  = require('gulp-babel'),
    rename = require('gulp-rename');

gulp.task('default', function () {
  return gulp.src('index.js')
    .pipe(babel())
    .pipe(rename('es5.js'))
    .pipe(gulp.dest('dist'));
});