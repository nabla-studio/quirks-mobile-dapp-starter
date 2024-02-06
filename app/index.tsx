import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';

export default function Homepage() {
  return (
    <View style={styles.container}>
      <Link href="/connection">
        <Text>Connection</Text>
      </Link>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Link href="/mnemonic">
        <Text>Mnemonic</Text>
      </Link>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Link href="/directsecp256k1hdwallet">
        <Text>Mnemonic CosmJS</Text>
      </Link>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Link href="/pbkdf2">
        <Text>Pbkdf2</Text>
      </Link>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Link href="/secp256k1">
        <Text>Secp256k1</Text>
      </Link>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Link href="/secp256r1">
        <Text>Secp256r1</Text>
      </Link>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
