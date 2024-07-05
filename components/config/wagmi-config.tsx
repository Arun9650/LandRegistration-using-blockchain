import { env } from "@/env";
// import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";

import { cookieStorage, createStorage } from "wagmi";
import {  
  sepolia,
} from "wagmi/chains";

// Get projectId at https://cloud.walletconnect.com
export const projectId = env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) throw new Error("Project ID is not defined");

// Create wagmiConfig
const chains = [
  sepolia,
] as const;
export const config = getDefaultConfig({
  appName: "Wagmi",
  projectId: projectId,
  chains: chains,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
});
