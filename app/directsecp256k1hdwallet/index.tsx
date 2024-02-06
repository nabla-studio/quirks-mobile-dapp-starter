import { Button, StyleSheet } from "react-native";

import { Text, View } from "../../components/Themed";
import { useState } from "react";
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing'

export default function CosmJSWallet() {
  const [score, setScore] = useState(0);
  const [mnemonic, setMnemonic] = useState<string>();

  const generateMnemonic = async () => {
    const start = performance.now();
    const wallet = await DirectSecp256k1HdWallet.generate(24);
    const end = performance.now();

    setScore(end - start);
    setMnemonic(wallet.mnemonic);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>DirectSecp256k1HdWallet</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />

      <Text>Mnemonic: {mnemonic}</Text>
      <Text>Performance: {score}ms</Text>

      <Button onPress={generateMnemonic} title="Generate Mnemonic" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
