'use client'

import { useEffect, useMemo, useState } from 'react';
import { Box, Divider } from '@mui/joy';
import { BadgeOptions, Header, InputField, Outputs } from '../../components';
import logo from './logo.svg';
import { getBaseUrl } from '@/helpers/utils';

function Vercel() {
  const [appName, setAppName] = useState('socketio-chat-h9jt');
  const [appPath, setAppPath] = useState('');
  const [badgeStyle, setBadgeStyle] = useState('flat');
  const [badgeLogo, setBadgeLogo] = useState('heroku');
  const [badgeName, setBadgeName] = useState('heroku');
  
  
  useEffect(() => {document.title = 'Heroku | Deploy Badge'});
  
  const badgeUrl = useMemo(() => {
    const url = new URL(getBaseUrl() + '/heroku');
    url.searchParams.append('url', `https://${appName}.herokuapp.com/${appPath}`);
    if (badgeStyle !== 'flat') url.searchParams.append('style', badgeStyle);
    if (badgeLogo !== 'heroku') url.searchParams.append('logo', badgeLogo);
    if (badgeName !== 'heroku') url.searchParams.append('name', badgeName);
    url.search = decodeURIComponent(url.search);

    return url;
  }, [appName, appPath, badgeStyle, badgeLogo, badgeName]);

  return (
    <div>
      <Header
        logo={logo}
        title="Heroku Badge"
      />
      
      <section>
        <Box sx={{display: 'flex', gap: 1.5}}>
          <InputField value={appName} suffix=".herokuapp.com" onChange={v => setAppName(v)} flex={2.5} />
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
      <Outputs label='Heroku' badgeUrl={badgeUrl} />
    </div>
  );
}

export default Vercel;