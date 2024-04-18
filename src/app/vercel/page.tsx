'use client'

import { useEffect, useMemo, useState } from 'react';
import { Box, Divider } from '@mui/joy';
import { BadgeOptions, Header, InputField, Outputs } from '../../components';
import logo from './logo.svg';
import { getBaseUrl } from '@/helpers/utils';

function Vercel() {
  const [appName, setAppName] = useState('deploy-badge');
  const [appPath, setAppPath] = useState('');
  const [badgeStyle, setBadgeStyle] = useState('flat');
  const [badgeLogo, setBadgeLogo] = useState('vercel');
  const [badgeName, setBadgeName] = useState('vercel');
  
  
  useEffect(() => {document.title = 'Vercel | Deploy Badge'});
  
  const badgeUrl = useMemo(() => {
    const url = new URL(getBaseUrl() + '/vercel');
    url.searchParams.append('url', `https://${appName}.vercel.app/${appPath}`);
    if (badgeStyle !== 'flat') url.searchParams.append('style', badgeStyle);
    if (badgeLogo !== 'vercel') url.searchParams.append('logo', badgeLogo);
    if (badgeName !== 'vercel') url.searchParams.append('name', badgeName);
    url.search = decodeURIComponent(url.search);

    return url;
  }, [appName, appPath, badgeStyle, badgeLogo, badgeName]);

  return (
    <div>
      <Header
        logo={logo}
        title="Vercel Badge"
      />
      
      <section>
        <Box sx={{display: 'flex', gap: 1.5}}>
          <InputField value={appName} suffix=".vercel.app" onChange={v => setAppName(v)} flex={2.5} />
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
      <Outputs label='Vercel' badgeUrl={badgeUrl} />
    </div>
  );
}

export default Vercel;
