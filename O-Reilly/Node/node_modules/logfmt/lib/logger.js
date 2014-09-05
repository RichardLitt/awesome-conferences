var _ = require('lodash');

exports.log = function(data, stream) {
  this.stream = this.stream || process.stdout;
  if(stream == undefined) stream = this.stream;

  var logData = _.extend({}, this.defaultData, data);

  if(this.timers){
    for(var key in this.timers){
      var now = (new Date()).getTime()
      logData[key] = (now - this.timers[key]).toString() + 'ms' ;
    }
  }

  stream.write(this.stringify(logData) + "\n");
}

exports.time = function(label) {
  var logfmt = require('../logfmt');
  var startTime = (new Date()).getTime();
  var label  = label || 'elapsed';
  var timer  = new logfmt();
  timer.stream = this.stream;
  timer.defaultData = this.defaultData;
  timer.timers = _.extend({}, this.timers)
  timer.timers[label] = startTime;
  return timer;
}

exports.namespace = function(object) {
  var logfmt = require('../logfmt');
  var namespaced = new logfmt()
  var namespace  = _.extend({}, this.defaultData, object);
  namespaced.stream = this.stream;
  namespaced.defaultData = namespace
  namespaced.timers = this.timers;
  return namespaced;
}

exports.error = function(err, id) {
  this.maxErrorLines = this.maxErrorLines || 10;
  if (id === undefined) {
    id = Math.random().toString().slice(2, 12);
  }
  this.log({ error:true, id:id, message:err.message });
  var stack = err.stack.split('\n');
  for (var line in stack) {
    if (line >= this.maxErrorLines) break;
    this.log({ error:true, id:id, line:line, trace:stack[line] });
  }
}
