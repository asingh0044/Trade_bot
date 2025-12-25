import { http, createConfig } from "wagmi";
import { base, mainnet, optimism, sepolia } from "wagmi/chains";
import { injected, metaMask, safe, walletConnect } from "wagmi/connectors";

import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  rainbowWallet,
  metaMaskWallet,
  coinbaseWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
const projectId = "4c1d043b19bb6daf9144bf95faedc043";
const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [rainbowWallet, metaMaskWallet],
    },
    {
      groupName: "Others",
      wallets: [coinbaseWallet, walletConnectWallet],
    },
  ],
  { appName: "RainbowKit App", projectId: projectId }
);

export const config = createConfig({
  chains: [sepolia],
  connectors:connectors,
  ssr:true,
  transports: {
    [sepolia.id]: http(),
  },
});
