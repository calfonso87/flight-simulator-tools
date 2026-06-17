import { Input } from "../../atoms/Input";
import { InputProps } from "../../atoms/Input/Input.types";

export function FormField(props: InputProps) {
  return <Input {...props} />;
}
