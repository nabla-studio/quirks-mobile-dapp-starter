import { mergeQueryKeys, inferQueryKeyStore } from "@lukemorales/query-key-factory";
import { bank } from "./bank";

export const queries = mergeQueryKeys(bank);
