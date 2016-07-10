var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var mocha = require('gulp-mocha');

gulp.task('scripts', function () {
    gulp.src(['./main/client/**/*.js', '!./app_client/app.min.js'])
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./main/client'))
});

gulp.task('sass', function () {

});

gulp.task('test', function(){
    return gulp.src('./test/exampletest.js', {read: false})
        .pipe(mocha());
});

gulp.task('watch', function () {

});

gulp.task('default', ['scripts', 'sass', 'watch']);