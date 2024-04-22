"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { WagmiProvider } from "wagmi";
import { config } from "../config/wagmi-config";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <WagmiProvider config={config} >
      <QueryClientProvider client={queryClient}  >
        <RainbowKitProvider >{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default ReactQueryProvider;
