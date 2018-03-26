const gulp = require('gulp');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const jshint = require('gulp-jshint');
const runSequence = require('run-sequence');
const flatten = require('gulp-flatten');
const historyApiFallback = require('connect-history-api-fallback')


gulp.task('source', function () {
    gulp.src('./src/index.html')
        .pipe(gulp.dest('./static'));
    gulp.src('./src/bower_components/**/*')
        .pipe(gulp.dest('./static/bower_components'));
    gulp.src('./src/css/**/*')
        .pipe(gulp.dest('./static/css'));
    gulp.src('./src/dist/**/*')
        .pipe(gulp.dest('./static/dist'));
    gulp.src('./src/js/**/*')
        .pipe(gulp.dest('./static/js'));
    gulp.src('./src/img/**/*')
        .pipe(gulp.dest('./static/img'));
    gulp.src('./src/services/**/*')
        .pipe(gulp.dest('./static/services'));
    gulp.src('./src/data/**/*')
        .pipe(gulp.dest('./static/data'));
});


// watch files for changes and reload
gulp.task('serve', function () {
    browserSync({
        server: {
            baseDir: ['static'],
            middleware: [historyApiFallback()]
        }
    });
    gulp.watch(['src/**/*'], function (callback) { runSequence('source', reload) });
});


gulp.task('default', function (callback) { runSequence('source', 'serve') });