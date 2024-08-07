// Theme
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";

// Styling
import { useFonts } from "expo-font";
import { useColorScheme } from "@/hooks/useColorScheme";

// Router
import { Stack } from "expo-router";

// Splash
import * as SplashScreen from "expo-splash-screen";

// React / React Native
import { useEffect } from "react";

// Animations
import "react-native-reanimated";

// utils
import { pageOptions } from "@/utils";
import Header from "@/components/header";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={pageOptions.home} />
        <Stack.Screen name="(game)/join" options={pageOptions.join} />
        <Stack.Screen name="(lobby)/index" options={pageOptions.lobby} />
        <Stack.Screen name="(shop)/index" options={pageOptions.shop} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
