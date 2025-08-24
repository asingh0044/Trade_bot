import { SEPOLIA_CHAINID } from "@/lib/constant";
import { Token } from "@uniswap/sdk-core";
import { formatUnits } from "ethers/lib/utils";
import { erc20Abi } from "viem";
import { useReadContract } from "wagmi";

export const useTokenBalance = (token: Token,userAddress: `0x${string}`) => {
  const {data, refetch , isLoading} = useReadContract({
    address: token.address as `0x${string}`,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [userAddress],
    chainId: SEPOLIA_CHAINID,
  });
  const balance = data
    ? formatUnits(data as bigint, token.decimals)
    : "0";

  return { balance, refetch, isLoading };
};
