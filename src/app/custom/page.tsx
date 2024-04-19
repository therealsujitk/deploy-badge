'use client'

import { useEffect, useMemo, useState } from 'react';
import { Divider } from '@mui/joy';
import { BadgeOptions, Header, InputField, Outputs } from '../../components';
import logo from './logo.svg';
import { getBaseUrl } from '@/helpers/utils';

function Custom() {
  const [baseUrl, setBaseUrl] = useState('www.nextjs.org');
  const [badgeStyle, setBadgeStyle] = useState('flat');
  const [badgeLogo, setBadgeLogo] = useState('');
  const [badgeName, setBadgeName] = useState('website');
  
  useEffect(() => {document.title = 'Custom | Deploy Badge'});
  
  const badgeUrl = useMemo(() => {
    const url = new URL(getBaseUrl());
    const protocol = baseUrl.startsWith('http') ? '' : 'http://'
    url.searchParams.append('url', `${protocol}${baseUrl}`);
    if (badgeStyle !== 'flat') url.searchParams.append('style', badgeStyle);
    if (badgeLogo !== '') url.searchParams.append('logo', badgeLogo);
    if (badgeName !== '') url.searchParams.append('name', badgeName);

    return url;
  }, [baseUrl, badgeStyle, badgeLogo, badgeName]);

  return (
    <div>
      <Header
        logo={logo}
        title="Custom Badge"
      />
      
      <section>
        <InputField value={baseUrl} placeholder="Deployment URL" onChange={v => setBaseUrl(v)} />

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
