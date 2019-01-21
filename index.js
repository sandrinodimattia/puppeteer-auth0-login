const puppeteer = require("puppeteer");
const env = require("./env");

(async () => {
  const browser = await puppeteer.launch({ headless: false });

  const page = await browser.newPage();
  await page.goto(
    `https://${env.domain}/authorize?client_id=${env.clientId}&response_type=token&redirect_uri=${env.redirectUri}`,
    { waitUntil: "networkidle2" }
  );

  console.log('Waiting for page to load.');
  await page.waitForSelector('input[name="username"]', {
    visible: true,
    timeout: 5000
  });

  console.log('Entering email address...');
  await page.type('input[name="username"]', env.email, {delay: 50});

  console.log('Entering password...');
  await page.type('input[name="password"]', env.password, {delay: 50});

  console.log('Submit form.');
  await page.click('button[type="submit"]');
  await page.waitForNavigation({ waitUntil: "networkidle2" });

  console.log('Waiting to be redirected to the client.');
  const clientUrl = await page.evaluate(() => window.location.href);

  if (clientUrl.indexOf(`${env.redirectUri}/#access_token=`) !== 0) {
    throw new Error("Login failed. Current url:" + clientUrl);
  } else {
    console.log('Login success:', clientUrl);
  }

  await browser.close();
})();
