import { unwrapWETH, wrapETH } from "@/actions/wrap";
import { WETH_ADDRESS } from "@/lib/constant";
import { useMutation } from "@tanstack/react-query";
import { Token } from "@uniswap/sdk-core";

export const useWrap = () => {
  return useMutation({
    mutationKey: ["wrapEth"],
    mutationFn: ({
      inputToken,
      amount,
    }: {
      inputToken: Token;
      amount: string;
    }) => {
      if (inputToken.address === WETH_ADDRESS) {
        return unwrapWETH(amount);
      } else {
        return wrapETH(amount);
      }
    },
  });
};
