module.exports = homepage;

function homepage(request, response, next) {
  if (request.url === '/') {
    request.url = '/index.html'
  }
  next();
}
