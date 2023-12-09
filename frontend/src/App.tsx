import { useState } from 'react';
import './App.css';
import { Box, Button, Card, CssBaseline, CssVarsProvider, Divider, Input, Option, Select, Typography } from '@mui/joy';

function App() {
  const [appName, setAppName] = useState('therealsujitk');
  const [appPath, setAppPath] = useState('');
  const [badgeStyle, setBadgeStyle] = useState('flat');
  const [logo, setLogo] = useState('vercel');
  const [badgeName, setBadgeName] = useState('vercel');

  const badgeStyles: {[x: string]: string} = {
    'flat': 'Flat',
    'flat-square': 'Flat Square',
    'for-the-badge': 'For The Badge',
  };

  const badgeUrl = new URL(window.location.origin);
  badgeUrl.searchParams.append('app', appName);
  if (appPath !== '') badgeUrl.searchParams.append('root', appPath);
  if (badgeStyle !== 'flat') badgeUrl.searchParams.append('style', badgeStyle);
  if (logo !== 'vercel') badgeUrl.searchParams.append('logo', logo);
  if (badgeName !== 'vercel') badgeUrl.searchParams.append('name', badgeName);

  const outputs = [
    badgeUrl.toString(),
    `![Vercel Deploy](${badgeUrl})`,
    `<img src="${badgeUrl}" alt="Vercel Deploy"></img>`,
  ];

  return (
    <CssVarsProvider defaultMode="dark">
      <CssBaseline />
      <div className='App'>
        <header>
          <Box sx={{display: 'flex', alignItems: 'center', gap: 1.5}}>
            <svg width="45" height="40" viewBox="0 0 50 42.763" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m24.689 0 24.689 42.763H0L24.689 0Z" fill="#fff"/></svg>
            <h1>Vercel Badge</h1>
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
            <Input variant="soft" value={logo} sx={{flex: 1}} onChange={(e) => setLogo(e.target.value)} />
            <Input variant="soft" value={badgeName} sx={{flex: 1}} onChange={(e) => setBadgeName(e.target.value)} />
          </Box>
        </section>

        <Divider sx={{mt: 1.5, mb: 1.5}} orientation="horizontal" />

        <section>
          <Card>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <span style={{alignSelf: 'center'}}>Badge Preview</span><img src={outputs[0]} alt="Badge Preview" style={{alignSelf: 'center'}} />
            </div>
          </Card>
          {outputs.map(o => <Input variant="outlined" sx={{mt: 1.5, p: 2}} value={o} readOnly endDecorator={<Button sx={{mr: 0.5}} onClick={() => navigator.clipboard.writeText(o)}>Copy</Button>} />)}
        </section>

        <Divider sx={{mt: 1.5, mb: 1.5}} orientation="horizontal" />

        <footer>
          <ul style={{display: 'flex', gap: '15px', justifyContent: 'center'}}>
            <li>
              <a href="https://github.com/therealsujitk/vercel-badge"><Typography level="body-xs">GitHub</Typography></a>
            </li>
            <li>
              <a href="https://therealsuji.tk"><Typography level="body-xs">About Me</Typography></a>
            </li>
            <li>
              <a href="https://therealsuji.tk/donate"><Typography level="body-xs">Donate</Typography></a>
            </li>
          </ul>
        </footer>
      </div>
    </CssVarsProvider>
  );
}

export default App;
