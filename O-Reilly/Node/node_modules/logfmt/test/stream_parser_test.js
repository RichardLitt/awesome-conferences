var logfmt = require('../logfmt'),
    through = require('through'),
    stream = require('stream'),
    assert = require('assert');

//avoid test bleeding
var logfmt = new logfmt;

suite('logfmt.streamParser', function() {
  test("parses all the lines", function(done){
    var s = new stream.Readable;
    s._read = function(){};
    s.push('hello=kitty\n');
    s.push('foo=bar\n');
    s.push('path=/\n');
    s.push(null);

    var matches = [{path: '/'}, {foo: 'bar'}, {hello: 'kitty'}];
    s.pipe(logfmt.streamParser()).pipe(through(function(data){
      assert.deepEqual(data, matches.pop())
    },function(){
      done()
    }))
  })

  // is this the desired behavior?
  test("handles empty data", function(done){
    var s = new stream.Readable;
    s._read = function(){};
    s.push('');
    s.push(null);

    s.pipe(logfmt.streamParser()).pipe(through(function(data){
      assert.deepEqual({}, data);
    },function(){
      done()
    }))
  })

  // is this the desired behavior?
  test("handles empty lines", function(done){
    var s = new stream.Readable;
    s._read = function(){};
    s.push("   \n");
    s.push(null);

    s.pipe(logfmt.streamParser()).pipe(through(function(data){
      assert.deepEqual({}, data);
    },function(){
      done()
    }))
  })
})
