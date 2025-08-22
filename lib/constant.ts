import { Token, ChainId } from "@uniswap/sdk-core";
export const WETH_ADDRESS = "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14";
export const ETH_ADDRESS = "0x0000000000000000000000000000000000000000";
export const USDC_ADDRESS = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238";
export const SEPOLIA_CHAINID = 11155111;
export const WETH_TOKEN = new Token(
  ChainId.SEPOLIA,
  WETH_ADDRESS,
  18,
  "WETH",
  "Wrapped Ether"
);
export const ETH_TOKEN = new Token(
  ChainId.SEPOLIA,
  ETH_ADDRESS,
  18,
  "ETH",
  "Ether"
);

export const USDC_TOKEN = new Token(
  ChainId.SEPOLIA,
  USDC_ADDRESS,
  6,
  "USDC",
  "USDC"
);

export const filterOptions: Record<number, { title: string }> = {
  0: { title: "All" },
  1: { title: "Outgoing" },
  2: { title: "Incoming" },
};
