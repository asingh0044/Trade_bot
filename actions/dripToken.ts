import { getSigner } from "@/services/getSigner";
import CONTRACT_ABI from "../abi/faucetAbi.json";
import { ethers } from "ethers";
const CONTRACT_ADDRESS = "0xb2cf1100013b925915de58d17393d2119b66b959";

export const dripToken = async () => {
  try {
    const signer = await getSigner();
    const address = signer.getAddress();
    const faucet = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    const cooldown = await faucet.cooldown();
    const lastClaimed = await faucet.lastClaimed(address);
    const now = Math.floor(Date.now() / 1000);
    const nextAvailable = Number(lastClaimed) + Number(cooldown);
    const canClaim = now >= nextAvailable;
    if (canClaim) {
      const tx = await faucet.claim();
      await tx.wait();
      return {
        success: true,
        message: "Transsfer successful",
      };
    } else {
      const nextClaimDate = new Date(nextAvailable * 1000);
      throw new Error(
        `Next claim available at ${nextClaimDate.toLocaleString()}`
      );
    }
  } catch (error) {
    throw error;
  }
};
