import { Button, StyleSheet } from "react-native";

import { Text, View } from "../../components/Themed";
import { useState } from "react";
import { secp256k1 } from '@noble/curves/secp256k1';

export default function Pbkdf2() {
  const [score, setScore] = useState(0);
  const [privKey, setPrivKey] = useState<Uint8Array>();

  const generateMnemonic = async () => {
    const start = performance.now();
    const priv = secp256k1.utils.randomPrivateKey();
    const end = performance.now();

    setScore(end - start);
    setPrivKey(priv);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>secp256k1</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />

      <Text>Pub Key: {privKey}</Text>
      <Text>Performance: {score}ms</Text>

      <Button onPress={generateMnemonic} title="Generate pub key" />
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
