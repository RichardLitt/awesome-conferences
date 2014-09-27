var restify = require('restify');
var through = require('through');
var logfmt  = require('../logfmt');
var split   = require('split');

var server = restify.createServer({
  name: 'logfmt-test-server'
})

server.use(logfmt.requestLogger());

server.post('/logs', function(req, res, next){

  var jsonStream = through(function(line){
    this.queue(JSON.stringify(line))
  }, function(){
    this.queue(null)
  })

  req.pipe(logfmt.streamParser())
     .pipe(jsonStream)
     .pipe(process.stdout);

  res.send(201, 'OK')

  return next();
})

server.listen(3000);
