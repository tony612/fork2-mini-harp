module.exports = function() {
  var connect = require('connect');
  var app = connect();

  app.use(function(request, response, next) {
    var url = request.url.split("/");

    if (url[1] == "current-time") {
      response.end((new Date()).toISOString() + "\n");
    } else {
      next();
    }
  });

  return app;
};
