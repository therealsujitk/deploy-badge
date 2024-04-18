import { Option, Select } from "@mui/joy";

interface SelectFieldProps {
  value: string;
  options: { [x: string]: string };
  onChange: (value: string) => void;
}

function SelectField(props: SelectFieldProps) {
  return (
    <Select variant="soft" value={props.value} sx={{flex: 1}} onChange={(_, v) => props.onChange(v as string)}>
      {Object.keys(props.options).map((key, i) => <Option key={i} value={key}>{props.options[key]}</Option>)}
    </Select>
  );
}

export default SelectField;
