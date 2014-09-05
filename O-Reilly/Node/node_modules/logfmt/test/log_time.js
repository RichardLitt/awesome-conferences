var logfmt = require('../logfmt'),
    assert = require('assert');

var logfmt = new logfmt();
var OutStream = require('./outstream');

suite('logfmt.time', function() {
  setup(function(){
    logfmt.stream = new OutStream;
  })

  test("logs the time as elapsed", function(){
    var logger = logfmt.time();
    logger.log();
    var actual = logfmt.stream.logline;
    assert(/^elapsed=\dms\n$/.test(actual), actual)
  })

  test("logs the time with your label", function(){
    var logger = logfmt.time('time');
    logger.log();
    var actual = logfmt.stream.logline;
    assert(/^time=\dms\n$/.test(actual), actual)
  })

  test("logs the time with your data", function(){
    var logger = logfmt.time('time1').namespace({foo: 'bar'});
    logger.log({foo: 'bar'});
    var actual = logfmt.stream.logline;
    assert(/^foo=bar time1=\d+ms\n$/.test(actual), actual)
  })

  test("logs the time with your label and your data", function(){
    var logger = logfmt.time('time').namespace({foo: 'bar'})
    logger.log();
    var actual = logfmt.stream.logline;
    assert(/^foo=bar time=\dms\n$/.test(actual), actual)
  })

  //now we're using setTimeout to ensure the elapsed
  //time reflects a known delay
  test("accurancy in milliseconds", function(done){
    var logger = logfmt.time();
    var wrapped = function() {
      logger.log();
      var actual = logfmt.stream.logline;
      assert(/^elapsed=2\dms\n$/.test(actual), actual)
      done();
    }
    setTimeout(wrapped, 20);
  })

  test("supports log(data, stream) interface", function(){
    var mock_sink = new OutStream;
    var logger = logfmt.time()
    logger.log({foo: 'bar'}, mock_sink);
    var actual = mock_sink.logline;
    assert(/^foo=bar elapsed=\d+ms\n$/.test(actual), actual)
  })

  test('returns a logfmt', function(){
    var logger1 = logfmt.time();

    for(var prop in logfmt){
      assert(logger1[prop]);
    }
  })

  test('can nest multiple timers', function(){

    var logger  = logfmt.time('foo');
    var logger2 = logger.time('foo2');
    var logger3 = logger2.time('foo3');

    var mock_sink = new OutStream;

    logger2.log({}, mock_sink);
    var recovered = logfmt.parse(mock_sink.logline);
    console.log(recovered);
    assert(/^\d+ms/.test(recovered.foo));
    assert(/^\d+ms/.test(recovered.foo2));
    assert(recovered.foo3 === undefined);

    var mock_sink2 = new OutStream;
    logger3.log({}, mock_sink2);
    var recovered = logfmt.parse(mock_sink2.logline);
    console.log(recovered);
    assert(/^\d+ms/.test(recovered.foo));
    assert(/^\d+ms/.test(recovered.foo2));
    assert(/^\d+ms/.test(recovered.foo3));
  })

  // tests you can pass the logger into a closure
  // and call `log` multiple times.
  // uses setTimeout to ensure the timing happens in 20ms
  test("can log twice", function(done){
    var mock_sink = new OutStream;
    var logger = logfmt.time()
    logger.log({foo: 'bar'}, mock_sink);
    var actual = mock_sink.logline;
    assert(/^foo=bar elapsed=\d+ms\n$/.test(actual), actual)
    var wrapped = function() {
      logger.log({bar: 'foo'}, mock_sink);
      var actual = mock_sink.logline;
      assert(/^bar=foo elapsed=2\d+ms\n$/.test(actual), actual)
      done();
    }
    setTimeout(wrapped, 20);
  })
})
