import { ActivityIndicator, Pressable } from "react-native";
import { Text } from "../Text";
import { ButtonProps, ButtonVariant, ButtonSize } from "./Button.types";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: "bg-cockpit-blue",
  secondary: "bg-sky-800 border border-cockpit-blue",
  danger: "bg-red-900 border border-cockpit-red",
  ghost: "bg-transparent",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "px-3 py-2",
  md: "px-5 py-3",
  lg: "px-6 py-4",
};

export function Button({
  label,
  onPress,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  className,
}: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      className={`items-center justify-center rounded-xl active:opacity-75 ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${disabled || loading ? "opacity-50" : ""} ${className ?? ""}`}
    >
      {loading ? (
        <ActivityIndicator size="small" color="#e8f4fd" />
      ) : (
        <Text className="text-cockpit-white font-sans-medium text-base">{label}</Text>
      )}
    </Pressable>
  );
}
