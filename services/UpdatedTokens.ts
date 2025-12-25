import { ETH_ADDRESS } from "@/lib/constant";
import { TokenType } from "@/lib/types/transaction";
import React from "react";

export function addSepoliaETH(
  walletTokens: TokenType[],
  walletBalance: string
): TokenType[] {
  const hasEth = walletTokens.some(
    (token: TokenType) =>
      token.contractAddress === ETH_ADDRESS
  );

  if (hasEth) return walletTokens;

  return [
    ...walletTokens,
    {
      contractAddress: ETH_ADDRESS,
      tokenBalance: walletBalance,
      name: "Sepolia Ether",
      symbol: "ETH",
    },
  ];
}
