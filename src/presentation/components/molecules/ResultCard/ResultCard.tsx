import { View } from "react-native";
import { Text } from "../../atoms/Text";

interface ResultCardProps {
  label: string;
  value: string | number;
  unit: string;
  highlight?: boolean;
}

export function ResultCard({ label, value, unit, highlight = false }: ResultCardProps) {
  return (
    <View
      className={`rounded-xl p-4 flex-1 ${
        highlight ? "bg-blue-950 border border-cockpit-blue" : "bg-sky-800"
      }`}
    >
      <Text className="text-sky-400 text-xs uppercase tracking-widest mb-2">{label}</Text>
      <View className="flex-row items-baseline gap-1">
        <Text
          className={`text-2xl font-mono ${
            highlight ? "text-cockpit-green" : "text-cockpit-white"
          }`}
        >
          {value}
        </Text>
        <Text className="text-cockpit-amber text-sm font-mono">{unit}</Text>
      </View>
    </View>
  );
}
