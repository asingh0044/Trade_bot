import { http, createConfig } from "wagmi";
import { base, mainnet, optimism, sepolia } from "wagmi/chains";
import { injected, metaMask, safe, walletConnect } from "wagmi/connectors";

const projectId = "4c1d043b19bb6daf9144bf95faedc043";

export const config = createConfig({
  chains: [mainnet, base, sepolia],
  connectors: [injected(), walletConnect({ projectId }), metaMask(), safe()],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
    [sepolia.id]: http(),
  },
});
