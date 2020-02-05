const http = require("http");

module.exports = { start };

function start(port, routes) {
  return http.createServer((request, response) => {
    const data = router(routes, request, response);

    data.headers.forEach(header =>
      response.setHeader(Object.keys(header)[0], header[Object.keys(header)[0]]));
    response.setHeader('Status', data.status);
    response.setHeader('Content-Type', 'text/html');
    response.setHeader('Content-Length', Buffer.byteLength(data.body));
    response.write(data.body)
    response.end();
  }).listen(port, console.log(`Listening on ${port}`));
}

function router(routes, req, res) {
  if (routes[req.url]) return routes[req.url](req, res);

  return {
    status: 200,
    body: 'This page intentionally left blank',
    headers: [{ 'Set-Cookie': [`lazy=cookie; path=/; max-age=60; Secure;`] }],
  }
}
