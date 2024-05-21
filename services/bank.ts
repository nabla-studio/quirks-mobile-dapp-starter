import { Coin } from "@cosmjs/proto-signing";
import { client } from "./client";

interface GetBalancesProps {
  address: string;
}

interface PaginationResponse {
    next_key: string | null;
    total: string;
}

interface BalancesResponse {
    balances: Coin[];
    pagination: PaginationResponse;
}

export const getBalances = ({ address }: GetBalancesProps): Promise<BalancesResponse> =>
  client.get(`cosmos/bank/v1beta1/balances/${address}`).json();
