import { useEffect, useMemo, useState } from 'react';
import './App.css';
import { Box, Button, Card, CssBaseline, CssVarsProvider, Divider, Input, Option, Select, Typography } from '@mui/joy';

function App() {
  const [appName, setAppName] = useState('therealsujitk');
  const [appPath, setAppPath] = useState('');
  const [badgeStyle, setBadgeStyle] = useState('flat');
  const [badgeLogo, setBadgeLogo] = useState('vercel');
  const [badgeLabel, setBadgeLabel] = useState('vercel');

  const badgeStyles: {[x: string]: string} = {
    'flat': 'Flat',
    'flat-square': 'Flat Square',
    'plastic': 'Plastic',
    'for-the-badge': 'For The Badge',
  };
  
  const badgeUrl = useMemo(() => {
    const url = new URL(window.location.origin);
    url.searchParams.append('app', appName);
    if (appPath !== '') url.searchParams.append('root', appPath);
    if (badgeStyle !== 'flat') url.searchParams.append('style', badgeStyle);
    if (badgeLogo !== 'vercel') url.searchParams.append('logo', badgeLogo);
    if (badgeLabel !== 'vercel') url.searchParams.append('label', badgeLabel);

    return url;
  }, [appName, appPath, badgeStyle, badgeLogo, badgeLabel]);

  const [badgePreview, setBadgePreview] = useState<string>(badgeUrl.toString());

  useEffect(() => {
    const timeout = setTimeout(() => setBadgePreview(badgeUrl.toString()), 500);
    return () => clearTimeout(timeout);
  }, [badgeUrl]);

  const outputs = [
    badgeUrl.toString(),
    `![Vercel Deploy](${badgeUrl})`,
    `<img src="${badgeUrl}" alt="Vercel Deploy">`,
  ];

  const footerLinks: {[x: string]: string} = {
    'GitHub': 'https://github.com/therealsujitk/vercel-badge',
    'About Me': 'https://therealsuji.tk',
    'Donate': 'https://therealsuji.tk/donate',
  };

  return (
    <CssVarsProvider defaultMode="dark">
      <CssBaseline />
      <div className='App'>
        <header>
          <Box sx={{display: 'flex', alignItems: 'center', gap: 1.5, mb: 3}}>
            <svg width="45" height="40" viewBox="0 0 50 42.763" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m24.689 0 24.689 42.763H0L24.689 0Z" fill="#fff"/></svg>
            <Typography level="h1">Vercel Badge</Typography>
          </Box>
        </header>
        
        <section>
          <Box sx={{display: 'flex', gap: 1.5}}>
            <Input variant="soft" value={appName} endDecorator=".vercel.app" sx={{flex: 2.5}} onChange={(e) => setAppName(e.target.value)} />
            <Input variant="soft" value={appPath} startDecorator="/" sx={{flex: 1}} onChange={(e) => setAppPath(e.target.value)} />
          </Box>

          <Box sx={{display: 'flex', gap: 1.5, mt: 1.5}}>
            <Select variant="soft" value={badgeStyle} sx={{flex: 1}} onChange={(_, v) => setBadgeStyle(v as string)}>
              {Object.keys(badgeStyles).map((key, i) => <Option key={i} value={key}>{badgeStyles[key]}</Option>)}
            </Select>
            <Input variant="soft" value={badgeLogo} sx={{flex: 1}} placeholder="Badge Logo" onChange={(e) => setBadgeLogo(e.target.value)} />
            <Input variant="soft" value={badgeLabel} sx={{flex: 1}} placeholder="Badge Label" onChange={(e) => setBadgeLabel(e.target.value)} />
          </Box>
        </section>

        <Divider sx={{mt: 1.5, mb: 1.5}} orientation="horizontal" />

        <section>
          <Card>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <span style={{alignSelf: 'center'}}>Badge Preview</span><img src={badgePreview} alt="Badge Preview" style={{alignSelf: 'center'}} />
            </div>
          </Card>
          {outputs.map((o, i) => <Input key={i} variant="outlined" sx={{mt: 1.5, p: 2}} value={o} readOnly endDecorator={<Button sx={{mr: 0.5}} onClick={() => navigator.clipboard.writeText(o)}>Copy</Button>} />)}
        </section>

        <Divider sx={{mt: 1.5, mb: 1.5}} orientation="horizontal" />

        <footer>
          <ul style={{display: 'flex', gap: '15px', justifyContent: 'center'}}>
            {Object.keys(footerLinks).map((key, i) => (<li key={i}>
              <a href={footerLinks[key]}><Typography level="body-xs">{key}</Typography></a>
            </li>))}
          </ul>
        </footer>
      </div>
    </CssVarsProvider>
  );
}

export default App;
