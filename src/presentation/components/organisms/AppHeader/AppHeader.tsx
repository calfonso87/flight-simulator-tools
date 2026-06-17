import { Pressable, View } from "react-native";
import { useRouter } from "expo-router";
import { Text } from "../../atoms/Text";
import { Icon } from "../../atoms/Icon";

interface AppHeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
}

export function AppHeader({ title, subtitle, showBack }: AppHeaderProps) {
  const router = useRouter();

  return (
    <View className="px-4 pt-3 pb-4 border-b border-sky-800">
      {showBack && (
        <Pressable
          onPress={() => router.back()}
          className="flex-row items-center gap-1 mb-3 self-start"
        >
          <Icon name="arrow-left" size={18} color="#4da6ff" />
          <Text className="text-cockpit-blue text-sm font-sans-medium">Back</Text>
        </Pressable>
      )}
      <Text className="text-cockpit-white text-2xl font-sans-bold">{title}</Text>
      {subtitle && (
        <Text className="text-sky-400 text-sm mt-1">{subtitle}</Text>
      )}
    </View>
  );
}
