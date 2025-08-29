import {
  ETH_ADDRESS,
  ETH_TOKEN,
  MY_TOKEN,
  MY_TOKEN_ADDRESS,
  TEST_TOKEN,
  TEST_TOKEN_ADDRESS,
  USDC_ADDRESS,
  USDC_TOKEN,
  WETH_ADDRESS,
  WETH_TOKEN,
} from "@/lib/constant";
import { Token } from "@uniswap/sdk-core";

export const getSwapTokens = (tokenAddress: string ) : Token => {
  switch (tokenAddress.toLowerCase()) {
    case USDC_ADDRESS.toLowerCase():
      return USDC_TOKEN;
    case MY_TOKEN_ADDRESS.toLowerCase():
      return MY_TOKEN;
    case TEST_TOKEN_ADDRESS.toLowerCase():
      return TEST_TOKEN;
    case ETH_ADDRESS.toLowerCase():
      return ETH_TOKEN;
    default:
      return WETH_TOKEN;
  }
};
