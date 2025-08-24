import { SwapExactInSingle } from "@uniswap/v4-sdk";
import { ethers } from "ethers";
import { Token } from "@uniswap/sdk-core";

/**
 * Builds a Uniswap V4 swap config for any token pair.
 * @param tokenIn     The input token (Uniswap SDK Token object).
 * @param tokenOut    The output token (Uniswap SDK Token object).
 * @param amountIn    Human-readable string amount (e.g. "1.5").
 */
export const getUniswapConfig = (
  tokenIn: Token,
  tokenOut: Token,
  amountIn: string
): SwapExactInSingle | undefined => {
  if (!tokenIn || !tokenOut || !amountIn) return;

  // Uniswap requires poolKey to have deterministic ordering (currency0 < currency1)
  const currency0First =
    tokenIn.address.toLowerCase() < tokenOut.address.toLowerCase();

  const poolKey = {
    currency0: currency0First ? tokenIn.address : tokenOut.address,
    currency1: currency0First ? tokenOut.address : tokenIn.address,
    fee: 3000,
    tickSpacing: 60,
    hooks: "0x0000000000000000000000000000000000000000",
  };

  // Determine swap direction based on actual input token
  const zeroForOne =
    tokenIn.address.toLowerCase() === poolKey.currency0.toLowerCase();

  return {
    poolKey,
    zeroForOne,
    amountIn: ethers.utils.parseUnits(amountIn, tokenIn.decimals).toString(),
    amountOutMinimum: "0", // TODO: add slippage protection
    hookData: "0x00",
  };
};

// import { ETH_TOKEN, USDC_TOKEN } from "@/lib/constant";
// import { SwapExactInSingle } from "@uniswap/v4-sdk";
// import { ethers } from "ethers";

// export const getUniswapConfig = (tokenIn: string) => {
//   if (!tokenIn) return;
//   const newConfig: SwapExactInSingle = {
//     poolKey: {
//       currency0: ETH_TOKEN.address, // WETH/ETH < USDC
//       currency1: USDC_TOKEN.address,
//       fee: 3000,
//       tickSpacing: 60,
//       hooks: "0x0000000000000000000000000000000000000000",
//     },
//     zeroForOne: true, // ETH (currency0) → USDC (currency1)
//     amountIn: ethers.utils.parseUnits(tokenIn, ETH_TOKEN.decimals).toString(),
//     amountOutMinimum: "0",
//     hookData: "0x00",
//   };
//   return newConfig;
// };
