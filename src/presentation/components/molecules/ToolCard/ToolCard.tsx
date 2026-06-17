import { Pressable, View } from "react-native";
import { useRouter } from "expo-router";
import { Text } from "../../atoms/Text";
import { Badge } from "../../atoms/Badge";
import { Icon } from "../../atoms/Icon";

interface ToolCardProps {
  title: string;
  description: string;
  href: string;
  category?: string;
  isNew?: boolean;
}

export function ToolCard({ title, description, href, category, isNew }: ToolCardProps) {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.push(href as never)}
      className="bg-sky-800 rounded-xl p-4 active:opacity-75 border border-sky-700"
    >
      <View className="flex-row items-start justify-between mb-2">
        <Text className="text-cockpit-white font-sans-bold text-base flex-1 mr-2">{title}</Text>
        {isNew && <Badge label="NEW" variant="success" />}
      </View>
      <Text className="text-sky-400 text-sm mb-4 leading-relaxed">{description}</Text>
      <View className="flex-row items-center justify-between">
        {category ? (
          <Text className="text-cockpit-amber text-xs font-sans-medium">{category}</Text>
        ) : (
          <View />
        )}
        <Icon name="chevron-right" size={18} color="#4a5568" />
      </View>
    </Pressable>
  );
}
