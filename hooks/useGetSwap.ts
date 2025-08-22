import { getSingleSwap } from "@/actions/getSingleSwap";
import { useMutation } from "@tanstack/react-query";
import { SwapExactInSingle } from "@uniswap/v4-sdk";

export const useGetSwap = () => {
  return useMutation({
    mutationKey: ["swap",],
    mutationFn: (config: SwapExactInSingle) => getSingleSwap(config),
  });
};
