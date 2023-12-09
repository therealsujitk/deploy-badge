import express from 'express';
import got from 'got';
import http from 'http';
import https from 'https';
import NodeCache from 'node-cache';

const app = express();
const cache = new NodeCache();

interface Badge {
  key: string,
  value: string,
  color: string,
  style: string,
  logo: string,
}

async function createBadge(badge: Badge) {
  badge.value = badge.value.replace(/-/g, '--').replace(/_/g, '__');
  const url = new URL(`http://img.shields.io/badge/${badge.key}-${badge.value}-${badge.color}?style=${badge.style}&logo=${badge.logo}`);

  if (cache.has(url.toString())) {
    return cache.get(url.toString());
  }

  const response = (await got(url)).body;
  cache.set(url.toString(), response);
  return response;
}

app.use(express.static(__dirname + '/frontend/build', {
  index: false
}));
app.get('/*', (req, res) => {

  if (!("app" in req.query)) {
    return res.status(200).sendFile(__dirname + '/frontend/build/index.html');
  }

  const appName = req.query.app;
  const root = req.query.root ?? '';
  const style = req.query.style ?? 'flat';
  const badgeName = req.query.name ?? 'vercel'
  const logo = req.query.logo ?? 'vercel';

  const url = appName + '.vercel.app/' + root;
  const handleRequest = async (statusCode: number = 404) => {
    const badge: Badge = {
      key: (badgeName as string).replace(/-/g, '--').replace(/_/g, '__'),
      value: 'deployed',
      color: 'brightgreen',
      style: style as string,
      logo: logo as string,
    };

    if (statusCode <= 599 && statusCode >= 500) {
      // 500 - 599 -> Server Errors
      badge.value = 'failed';
      badge.color = 'red';
    } else if (statusCode <= 499 && statusCode >= 400) {
      // 400 - 499 -> Client Errors
      badge.value = 'not-found';
      badge.color = 'lightgrey';
    } else if (statusCode <= 399 && statusCode >= 300) {
      // 300 - 399 -> Redirects
    }

    // 200 - 299 -> Successful Responses
    // 100 - 199 -> Informational Responses

    res.setHeader('Content-type', 'image/svg+xml');
    res.status(200).send(await createBadge(badge));
  }

  try {
    https.get("https://" + url, async (response) => {
      var statusCode = response.statusCode;
      await handleRequest(statusCode);
    }).on('error', () => {
      // This could mean the HTTPS site is not available so we check for HTTP
      http.get("http://" + url, async (response) => {
        var statusCode = response.statusCode;
        await handleRequest(statusCode);
      }).on('error', () => {
        // Invalid Application Name
        handleRequest(404);
      });
    });
  } catch {
    // An error was encountered for some unknown reason
    res.status(500).send('Internal Server Error. Please open an issue at <a href="https://github.com/therealsujitk/vercel-badge/issues">vercel-badge/issues</a>.');
  }
});

export default app;