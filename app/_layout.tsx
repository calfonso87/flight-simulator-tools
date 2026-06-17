import "../global.css";
import { useEffect } from "react";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthProvider } from "@ui/auth/AuthProvider";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    Inter_400Regular: require("@expo-google-fonts/inter/Inter_400Regular.ttf"),
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    Inter_500Medium: require("@expo-google-fonts/inter/Inter_500Medium.ttf"),
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    Inter_700Bold: require("@expo-google-fonts/inter/Inter_700Bold.ttf"),
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    SpaceMono_400Regular: require("@expo-google-fonts/space-mono/SpaceMono_400Regular.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) return null;

  return (
    <GestureHandlerRootView className="flex-1">
      <SafeAreaProvider>
        <AuthProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(app)" />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="light" />
        </AuthProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
