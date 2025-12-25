import { SwapExactInSingle } from "@uniswap/v4-sdk";
import { ETH_TOKEN, USDC_TOKEN, WETH_TOKEN } from "./lib/constant";
import { ethers } from "ethers";

export const CurrentConfig: SwapExactInSingle = {
  poolKey: {
    currency0: ETH_TOKEN.address,    // WETH/ETH < USDC
    currency1: USDC_TOKEN.address,
    fee: 3000,
    tickSpacing: 60,
    hooks: "0x0000000000000000000000000000000000000000",
  },
  zeroForOne: true, // ETH (currency0) → USDC (currency1)
  amountIn: ethers.utils.parseUnits("0.05", ETH_TOKEN.decimals).toString(),
  amountOutMinimum: "0",
  hookData: "0x00",
};


export const CurrentConfig2: SwapExactInSingle = {
  poolKey: {
    currency0: ETH_TOKEN.address,
    currency1: WETH_TOKEN.address,
    fee: 500,
    tickSpacing: 10,
    hooks: "0x0000000000000000000000000000000000000000",
  },
  zeroForOne: true,
  amountIn: ethers.utils.parseUnits("0.05", ETH_TOKEN.decimals).toString(),
  amountOutMinimum: "0",
  hookData: "0x00",
};
