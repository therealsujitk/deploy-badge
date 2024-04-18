import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import ShieldsIO from './helpers/shields-io';

export async function middleware(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  if (!searchParams.get('url')) {
    return;
  }

  const requestUrl = new URL(request.url);
  const defaults: {badgeName?: string, badgeLogo?: string} = {};

  switch (requestUrl.pathname) {
    case '/heroku':
      defaults.badgeName = 'heroku';
      defaults.badgeLogo = 'heroku';
      break;
    case '/vercel':
      defaults.badgeName = 'vercel';
      defaults.badgeLogo = 'vercel';
      break;
  }

  const url = searchParams.get('url')!;
  const badgeStyle = searchParams.get('style');
  const badgeName = searchParams.get('name') ?? defaults.badgeName;
  const badgeLogo = searchParams.get('logo') ?? defaults.badgeLogo;

  const generateBadge = async (statusCode: number = 404) => {
    const badgeOptions = {
      label: badgeName,
      message: 'deployed',
      color: 'brightgreen',
      style: badgeStyle,
      logo: badgeLogo,
    };

    if (statusCode <= 599 && statusCode >= 500) {
      // 500 - 599 -> Server Errors
      badgeOptions.message = 'failed';
      badgeOptions.color = 'red';
    } else if (statusCode <= 499 && statusCode >= 400) {
      // 400 - 499 -> Client Errors
      badgeOptions.message = 'not found';
      badgeOptions.color = 'lightgrey';
    } else if (statusCode <= 399 && statusCode >= 300) {
      // 300 - 399 -> Redirects
    }

    // 200 - 299 -> Successful Responses
    // 100 - 199 -> Informational Responses
    const badge = await ShieldsIO.createBadge(badgeOptions);
    return badge;
  };

  try {
    const urlResponse = await fetch(url);
    const badge = await generateBadge(urlResponse.status);
    console.log(badge)

    const response = new NextResponse(badge);
    response.headers.set('Content-type', 'image/svg+xml')
    return response;
  } catch (err) {
    console.log(err)
    const errorMessage = `Internal Server Error. Please open an issue at <a href="https://github.com/therealsujitk/deploy-badge/issues">therealsujitk/deploy-badge</a>.\n\n<pre><code>${err}</code></pre>`;
    const response = new NextResponse(errorMessage);
    response.headers.set('Content-type', 'text/html; charset=utf-8')
    return response;
  }
}
