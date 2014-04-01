module.exports = makeJade;

function makeJade(root) {
  var jade = require('jade');
  var path = require('path');
  var fs = require('fs');

  return function(request, response, next) {
    var url = request.url;
    var fileName = url.split("/")[1];

    if (path.extname(url) === '.html')  {
      var newFileName = path.basename(fileName, '.html') + '.jade';
      var tmplPath = path.join(root, newFileName);
      fs.exists(tmplPath, function(isExist) {
        if (isExist) {
          fs.readFile(tmplPath, {encoding: 'utf8'}, function (err, data) {
            if (err) throw err;
            jade.render(data, {}, function(err, html) {
              if (err) throw err;
              response.end(html);
            });
          });
        } else {
          response.statusCode = 404;
          response.end('');
        }
      });
    } else {
      next();
    }
  };
}
