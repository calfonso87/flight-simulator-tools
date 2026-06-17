import { Tabs, Redirect } from "expo-router";
import { useAuthStore } from "@app/stores/authStore";
import { Icon } from "@ui/components/atoms/Icon";

export default function AppLayout() {
  const { user } = useAuthStore();

  if (!user) return <Redirect href="/(auth)/login" />;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#0d1526",
          borderTopColor: "#131e38",
          borderTopWidth: 1,
        },
        tabBarActiveTintColor: "#4da6ff",
        tabBarInactiveTintColor: "#4a5568",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => <Icon name="home" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="tools"
        options={{
          title: "Tools",
          tabBarIcon: ({ color, size }) => <Icon name="calculator" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
