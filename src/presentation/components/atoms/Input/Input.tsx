import { TextInput, View } from "react-native";
import { Text } from "../Text";
import { InputProps } from "./Input.types";

export function Input({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  keyboardType,
  suffix,
  hint,
  className,
}: InputProps) {
  return (
    <View className="w-full gap-1">
      {label && (
        <Text className="text-cockpit-white text-sm font-sans-medium">{label}</Text>
      )}
      <View
        className={`flex-row items-center bg-sky-800 rounded-lg px-3 py-3 border ${
          error ? "border-cockpit-red" : "border-sky-700"
        }`}
      >
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#4a5568"
          keyboardType={keyboardType ?? "default"}
          className={`flex-1 text-cockpit-white text-base font-mono ${className ?? ""}`}
        />
        {suffix && (
          <Text className="text-cockpit-amber text-sm font-mono ml-2">{suffix}</Text>
        )}
      </View>
      {error && <Text className="text-cockpit-red text-xs">{error}</Text>}
      {hint && !error && <Text className="text-sky-400 text-xs">{hint}</Text>}
    </View>
  );
}
