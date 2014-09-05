var logfmt = require('../logfmt');
var through = require('through');

process.stdin
  .pipe(logfmt.streamParser())
  .pipe(through(function(object){
    console.log(object);
  }))
