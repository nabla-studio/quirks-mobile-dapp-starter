import { useConfig, useConnect } from "@quirks/react";
import {
  Button,
  Image,
  Pressable,
  View,
  Text,
} from "react-native";

export const ConnectBtn = () => {
  const { wallets } = useConfig();
  const { connect, disconnect, connected } = useConnect();

  if (connected) {
    return (
      <View style={{ marginVertical: 24 }}>
        <Button onPress={disconnect} title="Disconnect" />
      </View>
    );
  }

  return (
    <View
      style={{
        marginVertical: 24,
      }}
    >
      <Text
        style={{
          marginBottom: 12,
        }}
      >
        Connect using:{" "}
      </Text>
      <View style={{ alignItems: "center", gap: 12, flexDirection: 'row' }}>
        {wallets.map((wallet) => (
          <View key={wallet.options.wallet_name}>
            <Pressable
              onPress={async () => {
                await connect(wallet.options.wallet_name);
              }}
            >
              <Image
                source={{
                  uri: wallet.options.images[0].png,
                  height: 48,
                  width: 48,
                }}
                alt={wallet.options.pretty_name}
              />
            </Pressable>
          </View>
        ))}
      </View>
    </View>
  );
};
