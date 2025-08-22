import { getQuote } from "@/actions/getQuote";
import { useQuery } from "@tanstack/react-query";
import { SwapExactInSingle } from "@uniswap/v4-sdk";

export const useGetQuote = (CurrentConfig: SwapExactInSingle | null) => {
  return useQuery({
    queryKey: ["query"],
    queryFn: () => getQuote(CurrentConfig!),
    enabled: !!CurrentConfig,
  });
};
