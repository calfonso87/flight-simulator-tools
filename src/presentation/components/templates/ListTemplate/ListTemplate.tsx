import React from "react";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface ListTemplateProps {
  header: React.ReactNode;
  children: React.ReactNode;
}

export function ListTemplate({ header, children }: ListTemplateProps) {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-sky-950" style={{ paddingTop: insets.top }}>
      {header}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 24 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="w-full max-w-2xl self-center">{children}</View>
      </ScrollView>
    </View>
  );
}
