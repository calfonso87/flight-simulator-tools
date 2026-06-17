import { View } from "react-native";
import { Text } from "../Text";

type BadgeVariant = "default" | "success" | "warning" | "danger" | "info";

const VARIANT: Record<BadgeVariant, { container: string; text: string }> = {
  default: { container: "bg-sky-800", text: "text-cockpit-white" },
  success: { container: "bg-green-900", text: "text-cockpit-green" },
  warning: { container: "bg-amber-900", text: "text-cockpit-amber" },
  danger: { container: "bg-red-900", text: "text-cockpit-red" },
  info: { container: "bg-blue-900", text: "text-cockpit-blue" },
};

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
}

export function Badge({ label, variant = "default" }: BadgeProps) {
  const { container, text } = VARIANT[variant];
  return (
    <View className={`px-2 py-0.5 rounded-full ${container}`}>
      <Text className={`text-xs font-sans-medium ${text}`}>{label}</Text>
    </View>
  );
}
