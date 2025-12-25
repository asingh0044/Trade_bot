import { ethers } from "ethers";
import QUOTER_ABI from "../abi/quoterAbi.json";
import { getProvider } from "@/services/getProvider";
import { SwapExactInSingle } from "@uniswap/v4-sdk";
import { Token } from "@uniswap/sdk-core";
const QUOTER_CONTRACT_ADDRESS = "0x61B3f2011A92d183C7dbaDBdA940a7555Ccf9227";

export const getQuote = async (
  CurrentConfig: SwapExactInSingle,
  tokenOut: Token
): Promise<string> => {
  const provider = await getProvider();
  const quoterContract = new ethers.Contract(
    QUOTER_CONTRACT_ADDRESS,
    QUOTER_ABI,
    provider
  );

  try {
    const quotedAmountOut =
      await quoterContract.callStatic.quoteExactInputSingle({
        poolKey: CurrentConfig.poolKey,
        zeroForOne: CurrentConfig.zeroForOne,
        exactAmount: CurrentConfig.amountIn,
        hookData: CurrentConfig.hookData,
      });


    return ethers.utils.formatUnits(
      quotedAmountOut.amountOut,
      tokenOut.decimals
    );
  } catch (error) {
    throw error;
  }
};
