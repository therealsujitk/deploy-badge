import { Button } from "@mui/joy";
import Image from "next/image";
import Link from "next/link";

function ServiceButton(props: { logo: string, title: string, href: string }) {
  return (
    <Link href={props.href}>
      <Button color="neutral" variant="soft" sx={{width: '100%', padding: '0.8rem'}}>
        <Image src={props.logo} alt="Logo" style={{ height: '1.5rem', width: 'min-content', marginRight: '0.5rem' }} />
        {props.title}
      </Button>
    </Link>
  );
}

export default ServiceButton;
