module.exports = makeLess;

function makeLess(root) {
  var less = require('less');
  var path = require('path');
  var fs = require('fs');

  return function(request, response, next) {
    var url = request.url;
    var fileName = url.split("/")[1];

    if (path.extname(url) === '.css') {
      var newFileName = path.basename(fileName, '.css') + '.less';
      var tmplPath = path.join(root, newFileName);
      fs.exists(tmplPath, function(isExist) {
        if (isExist) {
          fs.readFile(tmplPath, {encoding: 'utf8'}, function (err, data) {
            if (err) throw err;
            less.render(data, function(e, css) {
              if (err) throw err;
              response.setHeader('Content-Length', css.length);
              response.setHeader('Content-Type', 'text/css; charset=UTF-8');
              response.end(css);
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
