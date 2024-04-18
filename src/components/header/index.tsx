import { Box, IconButton, Typography } from "@mui/joy";
import WestIcon from '@mui/icons-material/West';
import Image from "next/image";
import Link from "next/link";

function Header(props: {logo: string; title: string}) {
  return (
    <header style={{display: 'flex', gap: 10, alignItems: 'center', marginBottom: 25}}>
      <Link href="/">
        <IconButton>
          <WestIcon />
        </IconButton>
      </Link>

      <Box sx={{display: 'flex', alignItems: 'center', gap: 1.5}}>
        <Image src={props.logo} alt="Logo" style={{height: '40px', width: 'min-content'}} />
        <Typography level="h1">{props.title}</Typography>
      </Box>
    </header>
  );
}
  
export default Header;
