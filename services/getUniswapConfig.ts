import { ETH_TOKEN, USDC_TOKEN } from "@/lib/constant";
import { SwapExactInSingle } from "@uniswap/v4-sdk";
import { ethers } from "ethers";

export const getUniswapConfig = (tokenIn: string) => {
  if (!tokenIn) return;
  const newConfig: SwapExactInSingle = {
    poolKey: {
      currency0: ETH_TOKEN.address, // WETH/ETH < USDC
      currency1: USDC_TOKEN.address,
      fee: 3000,
      tickSpacing: 60,
      hooks: "0x0000000000000000000000000000000000000000",
    },
    zeroForOne: true, // ETH (currency0) → USDC (currency1)
    amountIn: ethers.utils.parseUnits(tokenIn, ETH_TOKEN.decimals).toString(),
    amountOutMinimum: "0",
    hookData: "0x00",
  };
  return newConfig;
};
