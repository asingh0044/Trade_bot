import { type ClassValue, clsx } from "clsx";
import { ethers } from "ethers";
import { twMerge } from "tailwind-merge";

export const trimAddress = (addr?: string) => {
  if (!addr) return "";
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function formatTokenBalance(tokenBalanceHex: string, decimals: number) {
  const balanceBN = ethers.BigNumber.from(tokenBalanceHex);
  return ethers.utils.formatUnits(balanceBN, decimals);
}
