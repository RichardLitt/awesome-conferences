var logfmt = require('../logfmt'),
    assert = require('assert');

var OutStream = require('./outstream');

suite('logfmt.log', function() {
  test("passing location as second param", function(){
    var mock_sink = new OutStream;
    var data = {foo: 'bar', a: 14}
    logfmt.log(data, mock_sink);
    assert.equal("foo=bar a=14\n", mock_sink.logline)
  })

  test("setting sink at object level", function(){
    var mock_sink = new OutStream;
    var data = {foo: "hello kitty"}
    var stream = logfmt.stream;
    logfmt.stream = mock_sink;
    logfmt.log(data);
    assert.equal("foo=\"hello kitty\"\n", mock_sink.logline)
    logfmt.stream = stream;
  })
})
