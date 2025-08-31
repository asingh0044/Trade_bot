import { SEPOLIA_CHAINID, USDC_ADDRESS } from "@/lib/constant";
import { TokenType } from "@/lib/types/transaction";
import { Token } from "@uniswap/sdk-core";

export const getToken = (data: TokenType) => {
  if (!data) {
    return;
  }
  return new Token(
    SEPOLIA_CHAINID,
    data.contractAddress,
    data.contractAddress.toLowerCase() === USDC_ADDRESS.toLowerCase() ? 6 : 18,
    data.symbol ?? undefined,
    data.name ?? undefined
  );
};
