var gulp = require('gulp'),
  expect = require('chai').expect,
  minifyCSS = require('../'),
  CleanCSS = require('clean-css'),
  es = require('event-stream'),
  Stream = require('stream'),
  path = require('path'),
  fs = require('fs');

require('mocha');

describe('gulp-minify-css minification', function() {
  var opts = {
    keepSpecialComments: 1,
    keepBreaks: true
  };
  
  describe('with buffers', function() {
    var filename = path.join(__dirname, './fixture/index.css');
    it('should minify my files', function(done) {
      gulp.src(filename)
      .pipe(minifyCSS(opts))
      .pipe(es.map(function(file){
        var source = fs.readFileSync(filename),
          expected = new CleanCSS(opts).minify(source.toString());
        expect(expected).to.be.equal(file.contents.toString());
        done();
      }));
    });

    it('should return file.contents as a buffer', function(done) {
      gulp.src(filename)
      .pipe(minifyCSS())
      .pipe(es.map(function(file) {
        expect(file.contents).to.be.an.instanceof(Buffer);
        done();
      }));
    });
  });
  describe('with streams', function() {
    var filename = path.join(__dirname, './fixture/index.css');
    it('should minify my files', function(done) {
      gulp.src(filename, {buffer: false})
      .pipe(minifyCSS(opts))
      .pipe(es.map(function(file){
        var source = fs.readFileSync(filename),
          expected = new CleanCSS(opts).minify(source.toString());
        file.contents.pipe(es.wait(function(err, data) {
          expect(expected).to.be.equal(data.toString());
          done();
        }));
      }));
    });

    it('should return file.contents as a stream', function(done) {
      gulp.src(filename, {buffer: false})
      .pipe(minifyCSS(opts))
      .pipe(es.map(function(file) {
        expect(file.contents).to.be.an.instanceof(Stream);
        done();
      }));
    });
  });
});

describe('does not loose other properties in the file object', function () {
  var filename = path.join(__dirname, './fixture/index.css');
  it('should pass through the same file instance', function (done) {
    var originalFile;
    gulp.src(filename)
    .pipe(es.mapSync(function (file) { return originalFile = file; }))
    .pipe(minifyCSS())
    .pipe(es.map(function (file) {
      expect(file).to.equal(originalFile);
      done();
    }));
  });
  it('should preserve additional properties on the original file instance', function (done) {
    gulp.src(filename)
    .pipe(es.mapSync(function (file) {
      file.someProperty = 42;
      return file;
    }))
    .pipe(minifyCSS())
    .pipe(es.map(function (file) {
      expect(file.someProperty).to.equal(42);
      done();
    }));
  });
});
