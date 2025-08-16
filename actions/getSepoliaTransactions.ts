import { ethers, providers } from "ethers";
const provider = new ethers.providers.JsonRpcProvider(
  "https://sepolia.infura.io/v3/7f42c054a72e43d1ab2b28019fbc1190"
);
export const getSepoliaTransactions = async (): Promise<
  providers.TransactionResponse[]
> => {
  try {
    const blockNumber = await provider.getBlockNumber();
    const blockTransactions = await provider.getBlockWithTransactions(
      blockNumber
    );
    return blockTransactions.transactions.slice(0, 20);
  } catch (error) {
    throw error;
  }
};
