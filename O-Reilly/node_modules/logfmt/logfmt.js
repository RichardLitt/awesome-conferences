//constructor
function logfmt() {
}
module.exports = logfmt;

var _                = require('lodash');
var streaming        = require('./lib/streaming');
var bodyParser       = require('./lib/body_parser');
var bodyParserStream = require('./lib/body_parser_stream');
var logfmtParser     = require('./lib/logfmt_parser');
var logger           = require('./lib/logger');
var requestLogger    = require('./lib/request_logger');
var serializer       = require('./lib/stringify');

//Build up logfmt prototype
_.extend(logfmt.prototype, logger);
_.extend(logfmt.prototype, streaming);

logfmt.prototype.stringify = serializer.stringify;
logfmt.prototype.parse = logfmtParser.parse;

// Synchronous body parser
logfmt.prototype.bodyParser = function(options) {
  options || (options = {});
  var mime = options.contentType || "application/logplex-1";
  return bodyParser({ contentType: mime, parser: this.parse });
};

// Stream parser
logfmt.prototype.bodyParserStream = function(options) {
  options || (options = {});
  var mime = options.contentType || "application/logplex-1";
  return bodyParserStream({ contentType: mime });
};

logfmt.prototype.requestLogger = function(options, formatter) {
  return requestLogger.init(this, options, formatter);
};

logfmt.prototype.requestLogger.commonFormatter = requestLogger.commonFormatter;

_.extend(logfmt, logfmt.prototype);
