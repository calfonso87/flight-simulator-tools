import { Link, Stack } from "expo-router";
import { View } from "react-native";
import { Text } from "@ui/components/atoms/Text";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Not Found" }} />
      <View className="flex-1 bg-sky-950 items-center justify-center p-6">
        <Text className="text-cockpit-amber text-6xl font-mono mb-4">404</Text>
        <Text className="text-cockpit-white text-xl font-sans-bold mb-2">Page not found</Text>
        <Text className="text-sky-400 text-base text-center mb-8">
          This screen doesn't exist.
        </Text>
        <Link href="/(app)" className="text-cockpit-blue font-sans-medium">
          Return home
        </Link>
      </View>
    </>
  );
}
