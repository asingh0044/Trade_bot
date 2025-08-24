import { getQuote } from "@/actions/getQuote";
import { useQuery } from "@tanstack/react-query";
import { Token } from "@uniswap/sdk-core";
import { SwapExactInSingle } from "@uniswap/v4-sdk";

export const useGetQuote = (CurrentConfig: SwapExactInSingle | null , tokenOut:Token) => {
  return useQuery({
    queryKey: ["query"],
    queryFn: () => getQuote(CurrentConfig!,tokenOut),
    enabled: !!CurrentConfig,
  });
};
