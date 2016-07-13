var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var mocha = require('gulp-mocha');

gulp.task('scripts', function () {
    gulp.src(['./main/client/**/*.js', '!./main/client/app.min.js'])
        .pipe(concat('app.min.js'))
        //   .pipe(uglify()) // TODO: uncomment, this is for debugging purposes only
        .pipe(gulp.dest('./main/client'));
});

gulp.task('sass', function () {

});

gulp.task('test', function(){
    return gulp.src('./test/exampletest.js', {read: false})
        .pipe(mocha());
});

gulp.task('watch', function () {
    gulp.watch(['./main/client/**/*.js', '!./main/client/app.min.js'], ['scripts']);
});

gulp.task('default', ['scripts', 'sass', 'watch']);