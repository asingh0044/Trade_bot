import { ethers } from "ethers";

export const getProvider = () => {
  return new ethers.providers.JsonRpcProvider(
    process.env.NEXT_PUBLIC_PROVIDER_URL!
  );
};
