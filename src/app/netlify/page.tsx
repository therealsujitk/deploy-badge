'use client'

import { useEffect, useMemo, useState } from 'react';
import { Divider } from '@mui/joy';
import { BadgeOptions, Header, InputField, Outputs } from '../../components';
import logo from './logo.svg';

function Netlify() {
  const [projectId, setProjectId] = useState('e6d5a4e0-dee1-4261-833e-2f47f509c68f');
  const [badgeStyle, setBadgeStyle] = useState('flat');
  const [badgeLogo, setBadgeLogo] = useState('netlify');
  const [badgeName, setBadgeName] = useState('netlify');

  useEffect(() => {document.title = 'Netlify | Deploy Badge'});
  
  const badgeUrl = useMemo(() => {
    const url = new URL(`http://img.shields.io/netlify/${projectId}`);
    if (badgeStyle !== 'flat') url.searchParams.append('style', badgeStyle);
    if (badgeLogo !== '') url.searchParams.append('logo', badgeLogo);
    if (badgeName !== 'netlify') url.searchParams.append('label', badgeName);
    url.search = decodeURIComponent(url.search);

    return url;
  }, [projectId, badgeStyle, badgeLogo, badgeName]);

  return (
    <div>
      <Header
        logo={logo}
        title="Netlify Badge"
      />
      
      <section>
        <InputField value={projectId} prefix="Project ID" onChange={v => setProjectId(v)} />

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
      <Outputs label='Netlify' badgeUrl={badgeUrl} />
    </div>
  );
}

export default Netlify;
