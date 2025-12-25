import { dripToken } from "@/actions/dripToken";
import { useMutation } from "@tanstack/react-query";

export const useDripToken = () => {
  return useMutation({
    mutationKey: ["dripToken"],
    mutationFn: dripToken,
  });
};
