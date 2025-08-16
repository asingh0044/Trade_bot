import { Transaction } from "@/lib/types/transaction";

export const getWalletTransactions = async (
  walletAddress: string
): Promise<Transaction[]> => {
  try {
    const url = `https://api-sepolia.etherscan.io/api?chainid=11155111&module=account&action=txlist&address=${walletAddress}&startblock=0&endblock=99999999&page=1&offset=25&sort=asc&apikey=${process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("error in fetching wallet transactions");
    }
    const data = await response.json();
    return data.result;
  } catch (error) {
    throw error;
  }
};
