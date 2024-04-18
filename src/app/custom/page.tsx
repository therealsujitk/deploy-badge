'use client'

import { useEffect, useMemo, useState } from 'react';
import { Box, Divider } from '@mui/joy';
import { BadgeOptions, Header, InputField, Outputs } from '../../components';
import logo from './logo.svg';

function Custom() {
  const [baseUrl, setBaseUrl] = useState('www.nextjs.org');
  const [appPath, setAppPath] = useState('');
  const [badgeStyle, setBadgeStyle] = useState('flat');
  const [badgeLogo, setBadgeLogo] = useState('');
  const [badgeName, setBadgeName] = useState('website');
  
  useEffect(() => {document.title = 'Vercel | Custom Badge'});
  
  const badgeUrl = useMemo(() => {
    const url = new URL(window.location.origin);
    const protocol = baseUrl.startsWith('http') ? '' : 'http://'
    url.searchParams.append('url', `${protocol}${baseUrl}/${appPath}`);
    if (badgeStyle !== 'flat') url.searchParams.append('style', badgeStyle);
    if (badgeLogo !== '') url.searchParams.append('logo', badgeLogo);
    if (badgeName !== '') url.searchParams.append('name', badgeName);
    url.search = decodeURIComponent(url.search);

    return url;
  }, [baseUrl, appPath, badgeStyle, badgeLogo, badgeName]);

  return (
    <div>
      <Header
        logo={logo}
        title="Custom Badge"
      />
      
      <section>
        <Box sx={{display: 'flex', gap: 1.5}}>
          <InputField value={baseUrl} placeholder="Deployment URL" onChange={v => setBaseUrl(v)} flex={2.5} />
          <InputField value={appPath} prefix="/" onChange={v => setAppPath(v)} flex={1} />
        </Box>

        <BadgeOptions
          style={badgeStyle}
          logo={badgeLogo}
          name={badgeName}
          onStyleChange={(v) => setBadgeStyle(v)}
          onLogoChange={(v) => setBadgeLogo(v)}
          onNameChange={(v) => setBadgeName(v)}
        />
      </section>

      <Divider sx={{mt: 1.5, mb: 1.5}} orientation="horizontal" />
      <Outputs label='Website' badgeUrl={badgeUrl} />
    </div>
  );
}

export default Custom;
