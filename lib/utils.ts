import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const trimAddress = (addr?: string) => {
  if (!addr) return "";
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
