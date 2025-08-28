import { formatTokenBalance } from "@/lib/utils";
import { Alchemy, Network, TokenBalanceType } from "alchemy-sdk";
import { ethers } from "ethers";

const alchemy = new Alchemy({
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY!,
  network: Network.ETH_SEPOLIA,
});

export async function getWalletTokens(address: `0x${string}`) {
  try {
    const response = await alchemy.core.getTokenBalances(
      address.toLowerCase(),
      {
        type: TokenBalanceType.ERC20,
      }
    );

    const tokensWithMeta = await Promise.all(
      response.tokenBalances.map(async (item) => {
        const tokenContract = item.contractAddress;
        const tokenMetadata = await alchemy.core.getTokenMetadata(
          tokenContract
        );

        return {
          contractAddress: tokenContract,
          tokenBalance: formatTokenBalance(
            item.tokenBalance!,
            tokenMetadata.decimals!
          ),
          name: tokenMetadata.name,
          symbol: tokenMetadata.symbol,
        };
      })
    );

    return tokensWithMeta;
  } catch (error:any) {
    throw new Error(error?.message);
  }
}
