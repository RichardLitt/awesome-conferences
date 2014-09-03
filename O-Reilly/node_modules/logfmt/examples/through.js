
var through = require('through');
var logfmt  = require('../logfmt')

process.stdin
  .pipe(through(function(data){
    if(/foo/.test(data)){
      this.queue(data);
    }else{
      process.stderr.write('discard ' + data);
    }
  }))
  .pipe(logfmt.streamParser())
  .pipe(through(function(obj){
    console.log(obj);
  }))
