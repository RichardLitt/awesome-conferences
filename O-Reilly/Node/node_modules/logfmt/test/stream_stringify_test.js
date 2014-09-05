var logfmt = require('../logfmt'),
    through = require('through'),
    stream = require('stream'),
    assert = require('assert');

//avoid test bleeding
var logfmt = new logfmt;

suite('logfmt.streamStringify', function() {
  test("stringifies all the objects", function(done){
    var s = new stream.PassThrough({objectMode: true});

    s.push({hello: 'kitty'});
    s.push({foo: 'bar'});
    s.push({path: '/'});
    s.push(null);
    var matches = ['path=/\n', 'foo=bar\n', 'hello=kitty\n'];
    s.pipe(logfmt.streamStringify()).pipe(through(function(data){
      assert.equal(data, matches.pop())
    },function(){
      done()
    }))
  })

  test("accepts a delimiter", function(done){
    var s = new stream.PassThrough({objectMode: true});

    s.push({hello: 'kitty'});
    s.push({foo: 'bar'});
    s.push({path: '/'});
    s.push(null);
    var matches = ['path=/', 'foo=bar', 'hello=kitty'];
    s.pipe(logfmt.streamStringify({delimiter: ''})).pipe(through(function(data){
      assert.equal(data, matches.pop())
    },function(){
      done()
    }))
  })
})
