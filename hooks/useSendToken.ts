import { sendTokens } from "@/actions/sendToken";
import { useMutation } from "@tanstack/react-query";

export const useSendToken = () => {
  return useMutation({
    mutationKey: ["sendToken"],
    mutationFn: ({
      tokenAddress,
      toAddress,
      amount,
    }: {
      tokenAddress: string;
      toAddress: string;
      amount: string;
    }) => sendTokens(tokenAddress, toAddress, amount),
  });
};
