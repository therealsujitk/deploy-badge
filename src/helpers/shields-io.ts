interface Badge {
  label?: string|null,
  message: string,
  color: string,
  style?: string|null,
  logo?: string|null,
}

async function createBadge(badge: Badge) {
  const url = new URL(`http://img.shields.io/badge/label-${badge.message}-${badge.color}`);
  url.searchParams.append('style', badge.style ?? '');
  url.searchParams.append('logo', badge.logo ?? '');
  url.searchParams.append('label', badge.label ?? '');

  const response = await fetch(url);
  const body = await response.text();
  return body;
}

const ShieldsIO = { createBadge };
export default ShieldsIO;
