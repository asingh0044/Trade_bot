import { useQuery } from "@tanstack/react-query";
import { getWalletTransactions } from "@/actions/getWalletTransactions";
export const useWalletAddress = (walletAddress: string) => {
  return useQuery({
    queryKey: ["walletTransactions", walletAddress],
    queryFn: () => getWalletTransactions(walletAddress),
    enabled: walletAddress.length > 0,
  });
};
