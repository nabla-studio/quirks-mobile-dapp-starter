import { Button, StyleSheet } from "react-native";

import { Text, View } from "../../components/Themed";
import { useState } from "react";
import * as bip39 from '@scure/bip39';
import { wordlist } from '@scure/bip39/wordlists/english';

export default function Mnemonic() {
  const [score, setScore] = useState(0);
  const [mnemonic, setMnemonic] = useState<string>();

  const generateMnemonic = async () => {
    const start = performance.now();
    const mn = bip39.generateMnemonic(wordlist, 256);
    console.log(mn);
    const end = performance.now();

    setScore(end - start);
    setMnemonic(mn);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mnemonic</Text>
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
