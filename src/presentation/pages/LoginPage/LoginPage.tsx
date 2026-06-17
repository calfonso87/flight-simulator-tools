import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Text } from "../../components/atoms/Text";
import { Button } from "../../components/atoms/Button";
import { Icon } from "../../components/atoms/Icon";

export function LoginPage() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const handleGuestContinue = () => {
    router.replace("/(app)");
  };

  return (
    <View
      className="flex-1 bg-sky-950 items-center justify-center px-6"
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
      <View className="items-center mb-12">
        <View className="bg-sky-800 rounded-full p-6 mb-6 border border-sky-700">
          <Icon name="plane" size={56} color="#4da6ff" />
        </View>
        <Text className="text-cockpit-white text-4xl font-sans-bold">FlightSim</Text>
        <Text className="text-cockpit-blue text-4xl font-sans-bold">Tools</Text>
        <Text className="text-sky-400 text-base mt-3 text-center leading-relaxed">
          Professional flight simulation utilities for pilots
        </Text>
      </View>

      <View className="w-full max-w-sm gap-3">
        <Button
          label="Continue as Guest"
          onPress={handleGuestContinue}
          variant="primary"
          size="lg"
          className="w-full"
        />
        <Button
          label="Sign In"
          onPress={() => {}}
          variant="secondary"
          size="lg"
          disabled
          className="w-full"
        />
        <Text className="text-sky-600 text-xs text-center mt-2">
          Authentication coming soon
        </Text>
      </View>
    </View>
  );
}
