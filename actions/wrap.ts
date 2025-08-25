import { WETH_ADDRESS } from "@/lib/constant";
import { getSigner } from "@/services/getSigner";
import { ethers } from "ethers";

const WETH_ABI = [
  "function deposit() payable",
  "function withdraw(uint wad)",
  "function balanceOf(address) view returns (uint)",
];

export const wrapETH = async (amountInEth: string): Promise<boolean> => {
  try {
    const signer = await getSigner();
    const weth = new ethers.Contract(WETH_ADDRESS, WETH_ABI, signer);

    const tx = await weth.deposit({
      value: ethers.utils.parseEther(amountInEth), // e.g. "0.1"
    });
    await tx.wait();

    return true;
  } catch (error) {
    console.error("Wrap failed:", error.reason || error.message);
    throw error;
  }
};

export const unwrapWETH = async (amountInWeth: string): Promise<boolean> => {
  try {
    const signer = await getSigner();
    const weth = new ethers.Contract(WETH_ADDRESS, WETH_ABI, signer);

    const tx = await weth.withdraw(ethers.utils.parseEther(amountInWeth));
    await tx.wait();

    return true;
  } catch (error) {
    console.error("Unwrap failed:", error.reason || error.message);
    throw error;
  }
};
