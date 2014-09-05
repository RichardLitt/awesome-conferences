var logfmt = require('../logfmt');

var logger = logfmt.time('thing')
logger.log({foo: 'bar'})

var this_thing = function(){
  logfmt.log({at: "logfmt log"})
  logger.log({at: "thing"})

  var inner_logger = logger.time()

  var inner_thing = function(){
    logfmt.log({at: "logfmt log"})
    logger.log({at: "thing"})
    inner_logger.log({at: 'inner thing'});
  }
  setTimeout(inner_thing, 100);
}
setTimeout(this_thing, 300);
