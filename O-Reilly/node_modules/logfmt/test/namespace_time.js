var logfmt = require('../logfmt'),
    assert = require('assert');

var OutStream = require('./outstream');

suite('logfmt.namespace.time', function() {

  test("works with explicit logging location", function(){
    var logfmt2 = logfmt.namespace({ns: 'logfmt'})
    var logger = logfmt2.time();
    var mock_sink = new OutStream;
    logger.log({}, mock_sink);
    var actual = mock_sink.logline;
    assert(/^ns=logfmt elapsed=\dms\n$/.test(actual), actual)
  })

  test("works with logfmt.time and implicit log location", function(){
    var logfmt2 = logfmt.namespace({ns: 'logfmt'})
    logfmt2.stream = new OutStream;
    var timer = logfmt2.time('time');
    timer.log({foo: 'bar'});
    var actual = logfmt2.stream.logline;
    assert(/^ns=logfmt foo=bar time=\dms\n$/.test(actual), actual)
  })

  test("works with persistent data", function(){
    var logfmt2 = logfmt.namespace({ns: 'logfmt'})
    logfmt2.stream = new OutStream;
    var logger = logfmt2.time().namespace({foo: 'bar'});
    logger.log();
    var actual = logfmt2.stream.logline;
    assert(/^ns=logfmt foo=bar elapsed=\dms\n$/.test(actual), actual)
    logger.log({moar: 'data'});
    var actual = logfmt2.stream.logline;
    assert(/^ns=logfmt foo=bar moar=data elapsed=\dms\n$/.test(actual),
            actual)
  })
})
