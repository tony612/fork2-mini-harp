module.exports = function(root) {
  var connect = require('connect');
  var serveStatic = require('serve-static');
  var makeJade = (require('./lib/processor/jade'))(root);
  var makeLess = (require('./lib/processor/less'))(root);
  var homepage = require('./lib/processor/homepage');
  var reject = require('./lib/processor/reject');

  var app = connect()
    .use(homepage)
    .use(reject)
    .use(function(request, response, next) {
      var url = request.url.split("/");

      if (url[1] == "current-time") {
        response.end((new Date()).toISOString() + "\n");
      } else {
        next();
      }
    })
    .use(serveStatic(root || __dirname + '/'))
    .use(makeJade)
    .use(makeLess);

  return app;
};
