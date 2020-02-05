const server = require("./lib/server");

const root = (req, res) => {
  return {
    status: 200,
    headers: [{ 'Set-Cookie': [`lazy=cookie; path=/; max-age=60; Secure;`] }],
    body: `<a href="https://dev.after.coffee/auth">Authorize</a> Parent<hr><iframe title="testing" name="app-frame" context="Main" src="https://dev.after.coffee" />`,
  }
}

server.start(3000, {
  '/': root,
});
