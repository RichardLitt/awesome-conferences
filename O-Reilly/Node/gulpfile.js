// npm Modules
var del = require('del');
var es = require('event-stream');

// Gulp
var gulp = require('gulp'),
concat = require('gulp-concat'),
gutil = require('gulp-util'),
minifyCSS = require('gulp-minify-css'),
rename = require('gulp-rename'),
watch = require('gulp-watch');

// Compiler based plugins
var prefix = require('gulp-autoprefixer');
var sass = require('gulp-ruby-sass');
var uglify = require('gulp-uglify');

// Deleting files
// Cleans the sass cache
gulp.task('clean:sass-cache', function(cb) {
	del([
		'.sass-cache/**',
		], cb);
});

// Compile JS
// gulp.task('compile-js', function() {
// 	console.log("Attempting to compile js:");
// 	return gulp.src('public/js/*.js')
// 		.pipe(uglify())
// 		.pipe({
// 				path.basename += ".min"
// 		})
// 		.pipe(gulp.dest('dist/js/'));
// });

// Compile sass and autoprefixes for the last 10 versions
gulp.task('compile-sass', function() {
	console.log("Attempting to compile sass:");
	return gulp.src('public/scss/*.scss')
	.pipe(sass({
    style: "compressed"
  })).on('error', function(err) { console.log(err.message); })
	.pipe(prefix("last 10 versions"))
	.pipe(gulp.dest('public/css/'));
});

gulp.task('default', ['compile-sass']);
