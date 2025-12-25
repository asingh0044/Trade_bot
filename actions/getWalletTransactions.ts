import { Transaction } from "@/lib/types/transaction";

export const getWalletTransactions = async (
  walletAddress: string
): Promise<Transaction[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_ETHERSCAN_BASE_URL}&address=${walletAddress}&apikey=${process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY}`
    );

    if (!response.ok) {
      throw new Error("error in fetching wallet transactions");
    }
    const data = await response.json();
    return data.result;
  } catch (error) {
    throw error;
  }
};
