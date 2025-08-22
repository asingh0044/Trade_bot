import { ethers } from "ethers";
import { Actions, SwapExactInSingle, V4Planner } from "@uniswap/v4-sdk";
import { CommandType, RoutePlanner } from "@uniswap/universal-router-sdk";
import { getSigner } from "@/services/getSigner";
import { UNIVERSAL_ROUTER_ABI } from "@/abi/universalRouterAbi";
const UNIVERSAL_ROUTER_ADDRESS = "0x3A9D48AB9751398BbFa63ad67599Bb04e4BdF98b";

export const getSingleSwap = async (CurrentConfig: SwapExactInSingle) => {
  const signer = await getSigner();
  const universalRouter = new ethers.Contract(
    UNIVERSAL_ROUTER_ADDRESS,
    UNIVERSAL_ROUTER_ABI,
    signer
  );

  try {
    const deadline = Math.floor(Date.now() / 1000) + 3600; //1 hr

    const v4Planner = new V4Planner();
    const routePlanner = new RoutePlanner();
    v4Planner.addAction(Actions.SWAP_EXACT_IN_SINGLE, [CurrentConfig]);
    v4Planner.addAction(Actions.SETTLE_ALL, [
      CurrentConfig.poolKey.currency0,
      CurrentConfig.amountIn,
    ]);
    v4Planner.addAction(Actions.TAKE_ALL, [
      CurrentConfig.poolKey.currency1,
      CurrentConfig.amountOutMinimum,
    ]);
    const encodedActions = v4Planner.finalize();
    routePlanner.addCommand(CommandType.V4_SWAP, [
      v4Planner.actions,
      v4Planner.params,
    ]);

    const txOptions: any = {};
    if (CurrentConfig.poolKey.currency0 === ethers.constants.AddressZero) {
      txOptions.value = CurrentConfig.amountIn;
    }
    const tx = await universalRouter.execute(
      routePlanner.commands,
      [encodedActions],
      deadline,
      txOptions
    );
    const receipt = await tx.wait();
  } catch (error: any) {
    throw error;
  }
};
