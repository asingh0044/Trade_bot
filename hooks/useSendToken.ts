import { sendTokens } from "@/actions/sendToken";
import { useMutation } from "@tanstack/react-query";
import { Token } from "@uniswap/sdk-core";

export const useSendToken = () => {
  return useMutation({
    mutationKey: ["sendToken"],
    mutationFn: ({
      inputToken,
      toAddress,
      amount,
    }: {
      inputToken:Token;
      toAddress: string;
      amount: string;
    }) => sendTokens(inputToken, toAddress, amount),
  });
};
