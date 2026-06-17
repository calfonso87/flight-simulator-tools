import { KeyboardTypeOptions } from "react-native";

export interface InputProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
  keyboardType?: KeyboardTypeOptions;
  suffix?: string;
  hint?: string;
  className?: string;
}
