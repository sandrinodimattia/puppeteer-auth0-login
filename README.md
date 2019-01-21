# puppeteer-auth0-login

Using Google Puppeteer for logging in to Auth0.

Requires Node 8.

## Usage

- Get an Auth0 account
- Create a "Single Page Application" client and set the Callback URL to http://jwt.io
- Create a new database user
- Update the `env.example.js` file and rename to `env.js`
- Run it using `node index`

## Example

Output from the script:

```bash
Waiting for page to load.
Entering email address...
Entering password...
Submit form.
Waiting to be redirected to the client.
Login success: https://jwt.io/#access_token=XXX&expires_in=7200&token_type=Bearer
```
