import { Text as RNText, TextProps as RNTextProps } from "react-native";

export function Text(props: RNTextProps & { className?: string }) {
  return <RNText {...props} />;
}
