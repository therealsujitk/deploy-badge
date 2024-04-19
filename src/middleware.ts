import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import ShieldsIO from './helpers/shields-io';

/**
 * This function is called to support the older vercel-badge API
 * It will be removed soon.
 * 
 * @deprecated
 * @param request The NextRequest object
 */
async function oldMiddleware(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const app = searchParams.get('app');
  const root = searchParams.get('root') ?? '';

  const badgeStyle = searchParams.get('style');
  const badgeName = searchParams.get('name') ?? 'vercel';
  const badgeLogo = searchParams.get('logo') ?? 'vercel';

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
    return await ShieldsIO.createBadge(badgeOptions);
  };

  const urlResponse = await fetch(`https://${app}.vercel.app/${root}`);
  const badge = await generateBadge(urlResponse.status);

  const response = new NextResponse(badge);
  response.headers.set('Content-type', 'image/svg+xml')
  return response;
}

const defaults: {
  [x: string]: {
    badgeName: string;
    badgeLogo: string;
  }
} = {
  heroku: {
    badgeName: 'heroku',
    badgeLogo: 'heroku'
  },
  vercel: {
    badgeName: 'vercel',
    badgeLogo: 'vercel'
  }
};

/**
 * The middleware to handle the GET requests by rendering a badge or
 * displaying the react application based on the url parameters
 * 
 * @param request The NextRequest object
 * @returns 
 */
export async function middleware(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const pathParams = new URL(request.url).pathname.slice(1).split('/');

  // Legacy support for vercel-badge API
  if (searchParams.get('app')) {
    return oldMiddleware(request);
  }

  if (!searchParams.get('url') && !(Object.keys(defaults).includes(pathParams[0]) && pathParams[1])) {
    return;
  }

  let url = searchParams.get('url');
  const root = searchParams.get('root') ?? '';

  switch (pathParams[0]) {
    case 'heroku':
      url ??= `https://${pathParams[1]}.herokuapp.com/${root}`;
      break;
    case 'vercel':
      url ??= `https://${pathParams[1]}.vercel.app/${root}`;
      break;
  }

  const badgeStyle = searchParams.get('style');
  const badgeName = searchParams.get('name') ?? defaults[pathParams[0]]?.badgeName;
  const badgeLogo = searchParams.get('logo') ?? defaults[pathParams[0]]?.badgeLogo;

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
    return await ShieldsIO.createBadge(badgeOptions);
  };

  const urlResponse = await fetch(url!);
  const badge = await generateBadge(urlResponse.status);

  const response = new NextResponse(badge);
  response.headers.set('Content-type', 'image/svg+xml')
  return response;
}

function getBadgeDefaults(service?: string) {
  const defaults: {
    name?: string,
    logo?: string
  } = {};

  switch (service) {
    case 'heroku':
      defaults.name = 'heroku';
      defaults.logo = 'heroku';
      break;
    case 'vercel':
      defaults.name = 'vercel';
      defaults.logo = 'vercel';
      break;
  }

  return defaults;
}
