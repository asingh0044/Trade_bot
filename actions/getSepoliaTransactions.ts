import { getProvider } from "@/services/getProvider";
import {  providers } from "ethers";

export const getSepoliaTransactions = async (): Promise<
  providers.TransactionResponse[]
> => {
  try {
    const provider = await getProvider();
    const blockNumber = await provider.getBlockNumber();
    const blockTransactions = await provider.getBlockWithTransactions(
      blockNumber
    );
    return blockTransactions.transactions.slice(0, 20);
  } catch (error) {
    throw error;
  }
};
