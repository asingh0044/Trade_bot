import { getSigner } from "@/services/getSigner";
import { Token } from "@uniswap/sdk-core";
import { ethers } from "ethers";

export const sendTokens = async (
  inputToken: Token,
  toAddress: string,
  amount: string
) => {
  
  const signer = await getSigner();

  const tokenAbi = [
    "function transfer(address to, uint amount) public returns (bool)",
  ];
  const tokenContract = new ethers.Contract(
    inputToken.address,
    tokenAbi,
    signer
  );

  const numberOfTokens = ethers.utils.parseUnits(amount.toString(), inputToken.decimals);

  try {
    const tx = await tokenContract.transfer(toAddress, numberOfTokens);
    const receipt = await tx.wait();
    return receipt;
  } catch (error) {
    throw error;
  }
};
