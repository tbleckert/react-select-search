var gulp = require('gulp'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    babelify = require('babelify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    merge = require('utils-merge'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    gutil = require('gulp-util'),
    chalk = require('chalk');

function map_error(error) {
    if (error.fileName) {
        // regular error
        gutil.log(chalk.red(error.name)
            + ': '
            + chalk.yellow(error.fileName.replace(__dirname + '/src/js/', ''))
            + ': '
            + 'Line '
            + chalk.magenta(error.lineNumber)
            + ' & '
            + 'Column '
            + chalk.magenta(error.columnNumber || error.column)
            + ': '
            + chalk.blue(error.description));
    } else {
        // browserify error..
        gutil.log(chalk.red(error.name)
            + ': '
            + chalk.yellow(error.message));
    }

    this.end();
}

gulp.task('watch', function () {
    var args    = merge(watchify.args, { debug: true }),
        bundler = watchify(browserify('./index.js', args)).transform(babelify, { /* opts */ });

    bundle_js(bundler);

    bundler.on('update', function () {
        bundle_js(bundler);
    });
});

function bundle_js(bundler) {
    return bundler.bundle()
        .on('error', map_error)
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(gulp.dest('./dist'))
        .pipe(rename('bundle.js'))
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist'));
}

// Without sourcemaps
gulp.task('build', function () {
    var bundler = browserify('./index.js').transform(babelify, {/* options */ })

    return bundler.bundle()
        .on('error', map_error)
        .pipe(source('bundle.min.js'))
        .pipe(buffer())
        .pipe(rename('bundle.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
});