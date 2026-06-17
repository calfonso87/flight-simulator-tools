import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuthStore } from "@app/stores/authStore";
import { Text } from "../../components/atoms/Text";
import { Badge } from "../../components/atoms/Badge";
import { Icon } from "../../components/atoms/Icon";
import { ToolsList } from "../../components/organisms/ToolsList";

export function HomePage() {
  const insets = useSafeAreaInsets();
  const { user } = useAuthStore();

  return (
    <View className="flex-1 bg-sky-950" style={{ paddingTop: insets.top }}>
      <View className="px-4 pt-4 pb-6 border-b border-sky-800">
        <View className="flex-row items-center gap-3 mb-4">
          <View className="bg-sky-800 rounded-full p-3">
            <Icon name="plane" size={28} color="#4da6ff" />
          </View>
          <View className="flex-1">
            <Text className="text-sky-400 text-sm">Welcome back</Text>
            <Text className="text-cockpit-white text-xl font-sans-bold">
              {user?.name ?? "Pilot"}
            </Text>
          </View>
          {user && (
            <Badge
              label={user.role.toUpperCase()}
              variant={user.role === "guest" ? "default" : "info"}
            />
          )}
        </View>
        <View className="bg-sky-800 rounded-xl p-4 border border-sky-700">
          <Text className="text-cockpit-amber text-xs uppercase tracking-widest mb-1">
            FlightSim Tools
          </Text>
          <Text className="text-cockpit-white font-sans-medium">
            Professional flight simulation utilities for pilots and instructors.
          </Text>
        </View>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 24 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="w-full max-w-2xl self-center">
          <Text className="text-cockpit-amber text-xs uppercase tracking-widest mb-4">
            Available Tools
          </Text>
          <ToolsList />
        </View>
      </ScrollView>
    </View>
  );
}
