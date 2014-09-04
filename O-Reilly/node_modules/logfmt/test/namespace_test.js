var logfmt = require('../logfmt'),
    assert = require('assert');

var OutStream = require('./outstream');

suite('logfmt.namespace', function() {
  test('returns a logfmt', function(){
    var logger1 = logfmt.namespace();
    var logfmt2 = new logfmt();

    for(var prop in logfmt2){
      assert(logger1[prop]);
    }
  })

  test("does not modify data passed in", function(){
    var logfmt2 = logfmt.namespace({ns: 'logfmt'});
    var mock_sink = new OutStream;
    var data = {foo: 'bar', a: 14}
    logfmt2.log(data, mock_sink);
    assert.deepEqual(data, {foo: 'bar', a: 14});
  })

  test("includes data passed in on all log lines", function(){
    var logfmt2 = logfmt.namespace({ns: 'logfmt'});
    var mock_sink = new OutStream;
    var data = {foo: 'bar', a: 14}
    logfmt2.log(data, mock_sink);
    assert.equal("ns=logfmt foo=bar a=14\n", mock_sink.logline)
    logfmt2.log({}, mock_sink);
    assert.equal("ns=logfmt\n", mock_sink.logline)
    logfmt2.log(data, mock_sink);
    assert.equal("ns=logfmt foo=bar a=14\n", mock_sink.logline)
  })

  test("can chain namespace calls", function(){
    var logfmt2 = logfmt.namespace({ns: 'logfmt'})
                        .namespace({thing: 'data'});

    var logger = logfmt2.time();
    var mock_sink = new OutStream;
    logger.log({}, mock_sink);
    var actual = mock_sink.logline;
    assert(/^ns=logfmt thing=data elapsed=\dms\n$/.test(actual), actual)
  })
})
