import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { Platform, useColorScheme } from "react-native";
import { generateConfig } from "@quirks/react-native";
import {
  keplrExtension,
  keplrMobile,
  leapExtension,
  leapMobile,
} from "@quirks/wallets";
import { osmosis, osmosisAssetList } from "@nabla-studio/chain-registry";
import { QuirksConfig } from "@quirks/react";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

export default function RootLayout() {
  return <RootLayoutNav />;
}

const queryClient = new QueryClient()

const config = generateConfig({
  wallets:
    Platform.OS === "web"
      ? [keplrExtension, leapExtension]
      : [keplrMobile, leapMobile],
  chains: [osmosis],
  assetsLists: [osmosisAssetList],
  walletConnectOptions: {
    providerOpts: {
      logger: "info",
      projectId: process.env.EXPO_PUBLIC_WC_PROJECT_ID,
      metadata: {
        name: "Quirks Demo",
        description: "Quirks universal dApp demo",
        url: "https://www.quirks.nabla.studio/",
        icons: ["https://avatars.githubusercontent.com/u/37784886"],
      },
    },
  },
});

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <QueryClientProvider client={queryClient}>
      <QuirksConfig config={config}>
        <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
          <Stack />
        </ThemeProvider>
      </QuirksConfig>
    </QueryClientProvider>
  );
}
