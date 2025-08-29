import { SwapExactInSingle } from "@uniswap/v4-sdk";
import { ethers } from "ethers";
import { Token } from "@uniswap/sdk-core";

export const getUniswapConfig = (
  tokenIn: Token | null,
  tokenOut: Token| null,
  amountIn: string
): SwapExactInSingle | undefined => {
  if (!tokenIn || !tokenOut || !amountIn) return;

  const currency0First =
    tokenIn.address.toLowerCase() < tokenOut.address.toLowerCase();

  const poolKey = {
    currency0: currency0First ? tokenIn.address : tokenOut.address,
    currency1: currency0First ? tokenOut.address : tokenIn.address,
    fee: 3000,
    tickSpacing: 60,
    hooks: "0x0000000000000000000000000000000000000000",
  };

  const zeroForOne =
    tokenIn.address.toLowerCase() === poolKey.currency0.toLowerCase();

  return {
    poolKey,
    zeroForOne,
    amountIn: ethers.utils.parseUnits(amountIn, tokenIn.decimals).toString(),
    amountOutMinimum: "0",
    hookData: "0x00",
  };
};
