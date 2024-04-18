import { Button, Input } from "@mui/joy";

function OutputField(props: {value: string}) {
  return (
    <Input
      variant="outlined"
      sx={{mt: 1.5, p: 2}}
      value={props.value}
      endDecorator={<Button sx={{mr: 0.5}}
      onClick={() => navigator.clipboard.writeText(props.value)}>Copy</Button>}
      readOnly
    />
  );
}

export default OutputField;
