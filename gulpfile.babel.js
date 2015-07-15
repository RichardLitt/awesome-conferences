'use strict';

import gulp from 'gulp';
import gutil from 'gulp-util';
import gulpLoadPlugins from 'gulp-load-plugins';

var browserSync = require('browser-sync').create();

const plugins = gulpLoadPlugins();
const sassRoot = 'src/scss';
const cssRoot = 'dist/css';

function handleError(err) {
  console.log(err.toString());
}

gulp.task('serve', function() {
  browserSync.init({
        server: "./"
    });

    gulp.watch("src/scss/**/*.scss", ['build-sass'], function() { plugins.notify('Reloading Browser Sync...'); });
    gulp.watch(["dist/app/**/*.js", "views/**/*.html"], function() { plugins.notify('Reloading Browser Sync...'); }).on('change', browserSync.reload);
});

// ############################################################################################
// ############################################################################################

gulp.task('build-sass', () => {
  return gulp.src(sassRoot+'/*.scss')
    .pipe(plugins.plumber())
    .pipe(plugins.notify('Compile Sass File: <%= file.relative %>...'))
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.autoprefixer('last 10 versions'))
    .pipe(plugins.sass({
      style: 'compressed'
    })).on('error', handleError)
    .pipe(plugins.sourcemaps.write())
    .pipe(browserSync.stream())
    .pipe(gulp.dest(cssRoot));
});

// ############################################################################################
// ############################################################################################

gulp.task('watch-sass', () => {
  plugins.notify('Sass Stream is Active...');
  gulp.watch(sassRoot+'/**/*.scss', ['build-sass']);
});

// ############################################################################################
// ############################################################################################

gulp.task('default', ['build-sass'], () => {
  gutil.log('Transposing Sass...');
});

gulp.task('clean', ['clean:styles']);
gulp.task('watch', ['watch-sass']);
