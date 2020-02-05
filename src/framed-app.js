const server = require("./lib/server");

const auth = (req, res) => {
  return {
    status: 301,
    body: '<meta http-equiv="Refresh" content="0; URL=https://gregdaynes.ngrok.io">',
    headers: [{ 'Set-Cookie': ['__trust=; max-age=60; '] }],
  }
}

const root = (req, res) => {
  const status = 200;
  const body = `Hello world<hr><script>var cookie = document.cookie; document.write(cookie);</script>`;
  const headers = [{
    'Set-Cookie': [
      `samesitecookie=samesitecookie; path=/; max-age=60; SameSite=None; Secure`,
      `regularcookie=regularcookie; path=/; max-age=60; Secure`,
      `double=doublecookie; path=/; max-age=60; SameSite=None; Secure`,
      `double=doublecookie; path=/; max-age=60; Secure`,
    ]
  }];

  return { status, body, headers };
}

server.start(4000, {
  '/auth': auth,
  '/': root,
});
