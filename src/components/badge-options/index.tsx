import { Box } from "@mui/joy";
import { InputField, SelectField } from "..";

interface BadgeOptionsProps {
  style: string;
  logo: string;
  name: string;

  onStyleChange: (style: string) => void;
  onLogoChange: (logo: string) => void;
  onNameChange: (name: string) => void;
}

function BadgeOptions(props: BadgeOptionsProps) {
  const badgeStyles: {[x: string]: string} = {
    'flat': 'Flat',
    'flat-square': 'Flat Square',
    'plastic': 'Plastic',
    'for-the-badge': 'For The Badge',
  };

  return (
    <Box sx={{display: 'flex', gap: 1.5, mt: 1.5}}>
      <SelectField value={props.style} options={badgeStyles} onChange={(v) => props.onStyleChange(v)} />
      <InputField value={props.logo} placeholder="Badge Logo" onChange={v => props.onLogoChange(v)} flex={1} />
      <InputField value={props.name} placeholder="Badge Label" onChange={v => props.onNameChange(v)} flex={1} />
    </Box>
  );
}

export default BadgeOptions;
