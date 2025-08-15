"use client";

import { WagmiProvider as WagmiBaseProvider } from "wagmi";
import { config } from "@/wagmi.config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const WagmiProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiBaseProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiBaseProvider>
  );
};
