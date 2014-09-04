var logfmt = require('../logfmt'),
    through = require('through'),
    stream = require('stream'),
    assert = require('assert');

//avoid test bleeding
var logfmt = new logfmt;

suite('logfmt.bodyParserStream', function() {

  test("skips parsing when req._body is true", function(){

    var mockReq = new stream.Readable;
    mockReq.header = function(){
      return 'application/logplex-1';
    }
    mockReq._read = function(){};
    mockReq.push('hello=kitty');
    mockReq.push(null);

    mockReq._body = true;

    var next = function(err){
      assert.equal(mockReq.body, undefined)
    };

    var parser = logfmt.bodyParserStream();
    parser(mockReq, null, next)
  })

  test("skips parsing when contentType does not match", function(){
    var mockReq = new stream.Readable;
    mockReq.header = function(){
      return 'application/foo';
    }
    mockReq._read = function(){};
    mockReq.push('hello=kitty');
    mockReq.push(null);

    var next = function(err){
      assert.equal(mockReq.body, undefined)
    };

    var parser = logfmt.bodyParserStream();
    parser(mockReq, null, next)

  })

  test("converts body lines to object read stream", function(done){
    var mockReq = new stream.Readable;
    var data;

    mockReq.header = function(){
      return 'application/logplex-1';
    }
    mockReq._read = function(){};
    mockReq.push('hello=kitty');
    mockReq.push(null);
    var next = function(){};

    var parser = logfmt.bodyParserStream();
    parser(mockReq, null, next)

    mockReq.body.on('readable', function(){
      var chunk = mockReq.body.read();
      if (chunk !== null) {
        data = chunk;
      }
    })

    mockReq.body.on('end', function() {
      assert.deepEqual(data, { hello: 'kitty' });
      done();
    });
  })


  test("accepts contentType option", function(done){
    var mockReq = new stream.Readable;
    var data;
    mockReq.header = function(){
      return 'foo';
    }
    mockReq._read = function(){};
    mockReq.push('hello=kitty');
    mockReq.push(null);
    var next = function(){};

    var parser = logfmt.bodyParserStream({contentType: 'foo'});
    parser(mockReq, null, next)

    mockReq.body.on('readable', function(){
      var chunk = mockReq.body.read();
      if (chunk !== null) {
        data = chunk;
      }
    })

    mockReq.body.on('end', function() {
      assert.deepEqual(data, { hello: 'kitty' })
      done();
    });
  })

  test("parses all the lines", function(done){
    var mockReq = new stream.Readable;
    mockReq.header = function(){
      return 'application/logplex-1';
    }
    mockReq._read = function(){};
    mockReq.push('hello=kitty\n');
    mockReq.push('foo=bar\n');
    mockReq.push('path=/\n');
    mockReq.push(null);
    var next = function(){};

    var parser = logfmt.bodyParserStream();
    parser(mockReq, null, next)

    var matches = [{path: '/'}, {foo: 'bar'}, {hello: 'kitty'}];

    mockReq.body.pipe(through(function(data){
      assert.deepEqual(data, matches.pop())
    },function(){
      done()
    }))
  })

})
