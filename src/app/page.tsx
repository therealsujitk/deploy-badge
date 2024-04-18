import { ServiceButton } from "../components";
import { Grid, Typography } from "@mui/joy";
import customLogo from './custom/logo.svg';
import herokuLogo from './heroku/logo.svg';
import netlifyLogo from './netlify/logo.svg';
import vercelLogo from './vercel/logo.svg';

export default function Home() {
  const services = [
    {
      title: 'Vercel',
      logo: vercelLogo,
      href: '/vercel'
    },
    {
      title: 'Netlify',
      logo: netlifyLogo,
      href: '/netlify'
    },
    {
      title: 'Heroku',
      logo: herokuLogo,
      href: '/heroku'
    },
    {
      title: 'Custom',
      logo: customLogo,
      href: '/custom'
    },
  ];
  
  return (
    <div>
      <header>
        <Typography level="h1" mb={1}>
          <Typography marginRight={1.5}>🚀</Typography>
          Deploy Badge
        </Typography>
      </header>

      <Typography mb={3}>Generate a deployment badge for your project's README</Typography>

      <Grid container spacing={1.5} columns={2}>
        {services.map((service, i) => <Grid key={i} xs={1}><ServiceButton {...service} /></Grid>)}
      </Grid>
    </div>
  );
}
