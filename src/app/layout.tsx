import type { Metadata } from "next";
import "./globals.css";
import { CssBaseline, CssVarsProvider, Divider, Typography } from "@mui/joy";

export const metadata: Metadata = {
  title: "Deploy Badge",
  description: "Generate a deployment badge for your project's README",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const footerLinks: {[x: string]: string} = {
    'GitHub': 'https://github.com/therealsujitk/deploy-badge',
    'About Me': 'https://therealsuji.tk',
    'Donate': 'https://therealsuji.tk/donate',
  };
  
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="https://fav.farm/🚀" sizes="any" />
        <link href="https://fonts.googleapis.com/css2?family=Rubik&amp;display=swap" rel="stylesheet"></link>
      </head>
      <body>
        <CssVarsProvider defaultMode="dark">
          <CssBaseline />
          <div id="root">
            {children}

            <Divider sx={{mt: 1.5, mb: 1.5}} />

            <footer>
              <ul style={{display: 'flex', gap: '15px', justifyContent: 'center'}}>
                {Object.keys(footerLinks).map((key, i) => (<li key={i}>
                  <a href={footerLinks[key]}><Typography level="body-xs">{key}</Typography></a>
                </li>))}
              </ul>
            </footer>
          </div>
        </CssVarsProvider>
      </body>
    </html>
  );
}
