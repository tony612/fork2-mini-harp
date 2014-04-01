module.exports = function(root) {
  var connect = require('connect');
  var serveStatic = require('serve-static');

  var app = connect()
    .use(function(request, response, next) {
      var url = request.url.split("/");

      if (url[1] == "current-time") {
        response.end((new Date()).toISOString() + "\n");
      } else {
        next();
      }
    })
    .use(serveStatic(root || __dirname + '/'));

  return app;
};
