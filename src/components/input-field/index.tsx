import { Input } from "@mui/joy";

interface InputFieldProps {
  value: string;
  onChange: (value: string) => void;
  prefix?: string;
  suffix?: string;
  placeholder?: string;
  flex?: number;
}

function InputField(props: InputFieldProps) {
  return (
    <Input
      variant="soft"
      value={props.value}
      startDecorator={props.prefix}
      endDecorator={props.suffix}
      placeholder={props.placeholder}
      sx={{flex: props.flex}}
      onChange={(e) => props.onChange(e.target.value)}
    />
  );
}

export default InputField;
