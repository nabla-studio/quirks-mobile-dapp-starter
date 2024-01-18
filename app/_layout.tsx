import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Slot, SplashScreen } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { generateConfig } from '@quirks/react-native';
import { keplrMobile, leapMobile } from '@quirks/wallets';
import { osmosis, osmosisAssetList } from '@nabla-studio/chain-registry';
import { QuirksConfig } from "@quirks/react";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

const config = generateConfig({
  wallets: [keplrMobile, leapMobile],
  chains: [osmosis],
  assetsLists: [osmosisAssetList],
  walletConnectOptions: {
    providerOpts: {
      logger: "info",
      projectId: "6d437301387412a0afb40a948949014b",
      metadata: {
        name: "React App",
        description: "React App for WalletConnect",
        url: "https://walletconnect.com/",
        icons: ["https://avatars.githubusercontent.com/u/37784886"],
      },
    },
  },
})

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <QuirksConfig config={config}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Slot />
      </ThemeProvider>
    </QuirksConfig>
  );
}
