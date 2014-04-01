module.exports = reject;

function reject(request, response, next) {
  var path = require('path');

  var url = request.url;
  var extname = path.extname(url);

  if (extname === '.less' || extname === '.jade')  {
    response.statusCode = 404;
    response.end('');
  } else {
    next();
  }
}
