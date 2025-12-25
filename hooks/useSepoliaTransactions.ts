import { getSepoliaTransactions } from "@/actions/getSepoliaTransactions";
import { useQuery } from "@tanstack/react-query";
export const useSepoliaTransactions = () => {
  return useQuery({
    queryKey: ["sepoliaTransactions"],
    queryFn: getSepoliaTransactions,
    refetchInterval: 12000,
  });
};
