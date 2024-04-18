export function getBaseUrl() {
  if (typeof window === 'undefined') {
    return 'https://deploy-badge.vercel.app';
  }

  return window.location.origin;
}
