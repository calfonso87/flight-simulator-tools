import React from "react";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface CalculatorTemplateProps {
  header: React.ReactNode;
  form: React.ReactNode;
  results?: React.ReactNode;
  error?: React.ReactNode;
}

export function CalculatorTemplate({
  header,
  form,
  results,
  error,
}: CalculatorTemplateProps) {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-sky-950" style={{ paddingTop: insets.top }}>
      {header}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 24, gap: 24 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="w-full max-w-2xl self-center gap-6">
          {form}
          {error}
          {results}
        </View>
      </ScrollView>
    </View>
  );
}
