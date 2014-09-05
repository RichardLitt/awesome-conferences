var logfmt = require('../logfmt'),
    assert = require('assert');

suite('logfmt.stringify', function() {
  test("simple key value pairs", function(){
    var data = {foo: 'bar', a: 14}
    assert.equal("foo=bar a=14", logfmt.stringify(data))
  })

  test("true and false", function(){
    var data = {foo: true, bar: false}
    assert.equal("foo=true bar=false", logfmt.stringify(data))
  })

  test("quotes strings with spaces in them", function(){
    var data = {foo: "hello kitty"}
    assert.equal("foo=\"hello kitty\"", logfmt.stringify(data))
  })

  test("quotes strings with equals in them", function(){
    var data = {foo: "hello=kitty"}
    assert.equal("foo=\"hello=kitty\"", logfmt.stringify(data))
  })

  test("escapes quotes within strings with spaces in them", function(){
    var data = {foo: 'hello my "friend"'}
    assert.equal('foo="hello my \\"friend\\""', logfmt.stringify(data))
    var data = {foo: 'hello my "friend" whom I "love"'}
    assert.equal('foo="hello my \\"friend\\" whom I \\"love\\""', logfmt.stringify(data))
  })

  test("escapes backslahes within strings", function(){
    var data = {foo: 'why would you use \\LaTeX?'}
    assert.equal('foo="why would you use \\\\LaTeX?"', logfmt.stringify(data))
  })

  test("undefined is nothing", function(){
    var data = {foo: undefined}
    assert.equal("foo=", logfmt.stringify(data))
  })

  test("null is nothing", function(){
    var data = {foo: null}
    assert.equal("foo=", logfmt.stringify(data))
  })

  test("object with inherited properties", function(){
    var defaults = {foo: 42, bar: "abc"}
    var options = Object.create(defaults)
    options.foo = 13
    assert.equal('foo=13 bar=abc', logfmt.stringify(options));
  })
})
