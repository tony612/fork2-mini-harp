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
      if (fs.existsSync(tmplPath)) {
        var data = fs.readFileSync(tmplPath);
        var html = jade.render(data, {});
        response.end(html);
      } else {
        response.statusCode = 404;
        response.end('');
      }
    } else {
      next();
    }
  };
}
