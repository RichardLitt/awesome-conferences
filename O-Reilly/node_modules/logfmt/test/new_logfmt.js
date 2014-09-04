var logfmt = require('../logfmt'),
    assert = require('assert');

var OutStream = require('./outstream');

suite('new logfmt', function() {
  test("returns an isolated logfmt object", function(){
    var logfmt2 = new logfmt;
    logfmt2.stream = new OutStream;

    var logfmt3 = new logfmt;
    logfmt3.stream = new OutStream;

    var data = {foo: 'bar', a: 14}
    logfmt2.log(data);
    assert.equal("foo=bar a=14\n", logfmt2.stream.logline)
    assert.equal("", logfmt3.stream.logline)

    logfmt2.log({foo: 'bar'})
    logfmt3.log(data);
    assert.equal("foo=bar\n", logfmt2.stream.logline)
    assert.equal("foo=bar a=14\n", logfmt3.stream.logline)
  })
})
