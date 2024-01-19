import { useChains, useConnect } from "@quirks/react";
import { ActivityIndicator, Button } from "react-native";
import { create } from "zustand";
import { Text, View } from '../components/Themed';
import { MsgSend } from "cosmjs-types/cosmos/bank/v1beta1/tx"

const useSign = create(() => ({
  loading: false,
  error: false,
  errorMessage: '',
  success: false,
  hash: ''
}));

const send = async () => {
  try {
    useSign.setState({
      loading: true,
      error: false,
      success: false,
      errorMessage: '',
      hash: ''
    });

    const sign = (await import("@quirks/store")).sign;
    const getAddress = (await import("@quirks/store")).getAddress;

    const address = getAddress("osmosis");

    const msg = {
      typeUrl: MsgSend.typeUrl,
      value: MsgSend.fromPartial({
        amount: [
          {
            denom: "uosmo",
            amount: "1",
          },
        ],
        toAddress: address,
        fromAddress: address,
      }),
    };

    const txRaw = await sign("osmosis", [msg]);

    const broadcast = (await import("@quirks/store")).broadcast;

    const res = await broadcast("osmosis", txRaw);

    console.log(res);

    useSign.setState({
      success: true,
      hash: res.transactionHash
    });
  } catch (err) {
    console.error(err)
    useSign.setState({
      error: true,
      errorMessage: (err as Error).message
    });
  } finally {
    useSign.setState({
      loading: false,
    });
  }
};

export const Sign = () => {
  const { status, connected } = useConnect();
  const { accounts } = useChains();
  const { loading, error, success, hash, errorMessage } = useSign();

  return (
    <View style={{ gap: 24 }}>
      <Text>
        WALLET STATUS:{" "}
        <Text
          style={{
            color: status === "CONNECTED" ? "green" : undefined,
          }}
        >
          {status}
        </Text>
      </Text>
      {connected ? (
        <View style={{ gap: 24 }}>
          {accounts.map((account) => (
            <View key={account.chainId}>
              {/* <Text>Chain ID: {account.chainId}</Text> */}

              <Text>Chain Name: {account.chainName}</Text>

              <Text>Address: {account.bech32Address}</Text>
            </View>
          ))}

          <Button onPress={send} title="SIGN & SEND" />

          {loading ? <ActivityIndicator size="large" /> : false}
          {success ? (
            <View>
              <Text style={{ color: "green" }}>Success</Text>
              <Text>TX Hash: {hash}</Text>
            </View>
          ) : (
            false
          )}
          {error ? (
            <View>
              <Text style={{ color: "red" }}>Error</Text>
              <Text style={{ color: "red" }}>{errorMessage}</Text>
            </View>
          ) : (
            false
          )}
        </View>
      ) : (
        false
      )}
    </View>
  );
};
