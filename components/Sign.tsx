import { useChain, useChains, useConnect } from "@quirks/react";
import { ActivityIndicator, Button } from "react-native";
import { Text, View } from '../components/Themed';
import { MsgSend } from "cosmjs-types/cosmos/bank/v1beta1/tx"
import { useMutation, useQuery } from "@tanstack/react-query";
import { queries } from "@/queries";
import { queryClient } from "@/configs/tanstack-query";

const send = async () => {
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

  return broadcast("osmosis", txRaw);
};

export const Sign = () => {
  const { status, connected } = useConnect();
  const { accounts } = useChains();
  const { address, chain } = useChain('osmosis');

  const { data } = useQuery({
    ...queries.bank.balances(address!),
    enabled: Boolean(address),
    select({ balances }) {
      return balances.find(balance => balance.denom === 'uosmo');
    },
  });

  const { data: signData, isPending, isSuccess, isError, error, mutate } = useMutation({
    mutationKey: ['sign', chain.chain_id],
    mutationFn: send,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queries.bank.balances(address!).queryKey,
        refetchType: 'active'
      });
    }
  });

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
      {
        data
        ?
        <Text>
          Balance {data.denom}: {data.amount}
        </Text>
        : 
        false
      }
      {connected ? (
        <View style={{ gap: 24 }}>
          {accounts.map((account) => (
            <View key={account.chainId}>
              {/* <Text>Chain ID: {account.chainId}</Text> */}

              <Text>Chain Name: {account.chainName}</Text>

              <Text>Address: {account.bech32Address}</Text>
            </View>
          ))}

          <Button onPress={() => mutate()} title="SIGN & SEND" />

          {isPending ? <ActivityIndicator size="large" /> : false}
          {isSuccess ? (
            <View>
              <Text style={{ color: "green" }}>Success</Text>
              <Text>TX Hash: {signData.transactionHash}</Text>
            </View>
          ) : (
            false
          )}
          {isError ? (
            <View>
              <Text style={{ color: "red" }}>Error</Text>
              <Text style={{ color: "red" }}>{error.message}</Text>
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
