var logfmt = require('../logfmt'),
    assert = require('assert');

suite('roundtrip', function(){
  test("key value pairs are restored", function(){
    var data = {foo: 'bar', a: 14}
    assert.deepEqual(data, logfmt.parse(logfmt.stringify(data)));
  })

  test("true and false are restored", function(){
    var data = {foo: true, bar: false}
    assert.deepEqual(data, logfmt.parse(logfmt.stringify(data)));
  })

  test("quoted strings with spaces are restored", function(){
    var data = {foo: "hello kitty"}
    assert.deepEqual(data, logfmt.parse(logfmt.stringify(data)))
  })

  test("quoted strings with equals are restored", function(){
    var data = {foo: "hello=kitty"}
    assert.deepEqual(data, logfmt.parse(logfmt.stringify(data)))
  })

  test("backslahes are restored", function(){
    var data = {foo: 'why would you use \\LaTeX?'}
    assert.deepEqual(data, logfmt.parse(logfmt.stringify(data)))
  })


  test("escaped strings are restored", function(){
    var data = {foo: 'hello my "friend"'}
    assert.deepEqual(data, logfmt.parse(logfmt.stringify(data)))
    data = {foo: 'hello my "friend" whom I "love"'}
    assert.deepEqual(data, logfmt.parse(logfmt.stringify(data)))
  })

  test("null comes back as null", function(){
    var data = {foo: null}
    assert.deepEqual(data, logfmt.parse(logfmt.stringify(data)))
  })

  test("empty string comes back as an empty string", function(){
    var data = {foo: ''}
    assert.deepEqual(data, logfmt.parse(logfmt.stringify(data)))
  })
})
