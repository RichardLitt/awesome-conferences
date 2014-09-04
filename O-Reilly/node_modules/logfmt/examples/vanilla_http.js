var http = require('http');
var logfmt = require('../logfmt');
var through = require('through');

http.createServer(function (req, res) {
  req.pipe(logfmt.streamParser())
     .pipe(through(function(object){
       console.log(object);
     }))

  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('okay');
}).listen(3000);
