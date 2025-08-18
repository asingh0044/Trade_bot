import { ethers } from "ethers";

export const sendTokens= async(tokenAddress:string, toAddress:string, amount:string) =>{
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const tokenAbi = [
    "function transfer(address to, uint amount) public returns (bool)",
  ];
  const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, signer);

  const numberOfTokens = ethers.utils.parseUnits(amount.toString(), 18);

  try {
    const tx = await tokenContract.transfer(toAddress, numberOfTokens);
    await tx.wait();
    return await tx.json();
  } catch (error) {
    console.error("Error sending tokens:", error);
  }
}
