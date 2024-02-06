import { Button, StyleSheet } from "react-native";

import { Text, View } from "../../components/Themed";
import { useState } from "react";
import { pbkdf2, pbkdf2Async } from '@noble/hashes/pbkdf2';
import { sha256 } from '@noble/hashes/sha256';

export default function Pbkdf2() {
  const [score, setScore] = useState(0);
  const [pubKey, setPubKey] = useState<Uint8Array>();

  const generateMnemonic = async () => {
    const start = performance.now();
    const pbkey1 = pbkdf2(sha256, 'password', 'salt', { c: 32, dkLen: 32 });
    const end = performance.now();

    setScore(end - start);
    setPubKey(pbkey1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PBKDF2</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />

      <Text>Pub Key: {pubKey}</Text>
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
