import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
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
  QueryClientProvider,
} from '@tanstack/react-query'
import { queryClient } from "@/configs/tanstack-query";

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

const config = generateConfig({
  wallets: Platform.select({
    default: [keplrMobile, leapMobile],
    web: [keplrExtension, leapExtension]
  }),
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
