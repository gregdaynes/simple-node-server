# Simple Node Server

1. Define your application file - `app.js`

2. Require server library
    ```js
    const server = require('./lib/server)
    ```

3. define the server block with a port followed by a routes object
    ```js
    server.start(3000, {})
    ```

4. Add a root path that returns an object with at least `status`, `headers`,
   and `body` defined.
    ```js
    server.start(3000, {
      '/': {
        status: 200,
        headers: [{ 'Set-Cookie': [`hello=world; path=/; max-age=60; Secure;`] }],
        body: `A cookie has been set`,
        }
      },
    });
    ```
