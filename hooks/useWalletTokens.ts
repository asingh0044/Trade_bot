import { getWalletTokens } from "@/actions/getWalletTokens";
import { useQuery } from "@tanstack/react-query";

export const useWalletTokens = (address?: `0x${string}`) => {
  return useQuery({
    queryKey: ["walletTokens", address],
    queryFn: () => getWalletTokens(address!),
    enabled:!!address
  });
};
