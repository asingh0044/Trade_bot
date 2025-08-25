import {
  ETH_TOKEN,
  MY_TOKEN,
  TEST_TOKEN,
  USDC_TOKEN,
  WETH_TOKEN,
} from "@/lib/constant";

export const getSwapTokens = (tokenIndex: number) => {
  switch (tokenIndex) {
    case 0:
      return USDC_TOKEN;
    case 1:
      return MY_TOKEN;
    case 2:
      return TEST_TOKEN;
    case 3:
      return WETH_TOKEN;
    default:
      return ETH_TOKEN;
  }
};
