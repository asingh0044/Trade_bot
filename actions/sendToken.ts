import { getSigner } from "@/services/getSigner";
import { ethers } from "ethers";

export const sendTokens = async (
  tokenAddress: string,
  toAddress: string,
  amount: string
) => {
  const signer=await getSigner();

  const tokenAbi = [
    "function transfer(address to, uint amount) public returns (bool)",
  ];
  const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, signer);

  const numberOfTokens = ethers.utils.parseUnits(amount.toString(), 18);

  try {
    const tx = await tokenContract.transfer(toAddress, numberOfTokens);
    const receipt = await tx.wait();
    return receipt;
  } catch (error) {
    console.error("Error sending tokens:", error);
    throw error;
  }
};
