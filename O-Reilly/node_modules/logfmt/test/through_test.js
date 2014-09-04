var logfmt  = require('../logfmt'),
    stream  = require('stream'),
    through = require('through'),
    assert  = require('assert');


suite('through', function(){

  test('through on either side', function(done){

    var s = new stream.PassThrough;

    s.pipe(through())
     .pipe(logfmt.streamParser())
     .pipe(through(function(obj){
       assert.deepEqual({foo: true}, obj)
       done()
     }))

    s.push('foo\n');
  })

})
