import { ethers } from "ethers";

export const getSigner = async () => {
  if (!window.ethereum) {
    alert("MetaMask not installed!");
    throw new Error("MetaMask not installed");
  }

  await window.ethereum.request({ method: "eth_requestAccounts" });

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  return signer;
};
