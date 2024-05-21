import { getBalances } from "@/services";
import { createQueryKeys } from "@lukemorales/query-key-factory";

export const bank = createQueryKeys('bank', {
   balances: (address: string) => ({
    queryKey: [address],
    queryFn: () => getBalances({ address }),
   })
});
