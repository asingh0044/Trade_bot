import { Token, ChainId } from "@uniswap/sdk-core";
export const WETH_ADDRESS = "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14";
export const ETH_ADDRESS = "0x0000000000000000000000000000000000000000";
export const USDC_ADDRESS = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238";
export const SETH_ADDRESS = "0x0000000000000000000000000000000000000000";
export const MY_TOKEN_ADDRESS = "0x8caf3cb453a521c57280001be2b5841ae6e52ab0";
export const TEST_TOKEN_ADDRESS = "0xb9c99675e62a7899653b36ca96a1c4cc54f9345b";
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
export const MY_TOKEN = new Token(
  ChainId.SEPOLIA,
  MY_TOKEN_ADDRESS,
  18,
  "MT",
  "My Token"
);
export const TEST_TOKEN = new Token(
  ChainId.SEPOLIA,
  TEST_TOKEN_ADDRESS,
  18,
  "TT",
  "Test Token"
);

export const filterOptions: Record<number, { title: string }> = {
  0: { title: "All" },
  1: { title: "Outgoing" },
  2: { title: "Incoming" },
};

export const navLinks: Record<number, { link: string; title: string }> = {
  0: { link: "/send", title: "Send Ether" },
  1: { link: "/sendTokens", title: "Send Tokens" },
  2: { link: "/swap", title: "Swap" },
  3: { link: "/faucet", title: "Faucet" },
};
