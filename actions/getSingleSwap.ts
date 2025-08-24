import { ethers } from "ethers";
import { Actions, SwapExactInSingle, V4Planner } from "@uniswap/v4-sdk";
import { CommandType, RoutePlanner } from "@uniswap/universal-router-sdk";
import { getSigner } from "@/services/getSigner";
import { UNIVERSAL_ROUTER_ABI } from "@/abi/universalRouterAbi";
const UNIVERSAL_ROUTER_ADDRESS = "0x3A9D48AB9751398BbFa63ad67599Bb04e4BdF98b";
const PERMIT2_ADDRESS = "0x000000000022D473030F116dDEE9F6B43aC78BA3";
import PERMIT2_ABI from "../abi/permitAbi.json";
export const getSingleSwap = async (CurrentConfig: SwapExactInSingle) => {
  const signer = await getSigner();
  const universalRouter = new ethers.Contract(
    UNIVERSAL_ROUTER_ADDRESS,
    UNIVERSAL_ROUTER_ABI,
    signer
  );

  const tokenInAddress = CurrentConfig.zeroForOne
    ? CurrentConfig.poolKey.currency0
    : CurrentConfig.poolKey.currency1;
  const tokenOutAddress = CurrentConfig.zeroForOne
    ? CurrentConfig.poolKey.currency1
    : CurrentConfig.poolKey.currency0;

  try {
    const deadline = Math.floor(Date.now() / 1000) + 3600; //1 hr

    const v4Planner = new V4Planner();
    const routePlanner = new RoutePlanner();
    v4Planner.addAction(Actions.SWAP_EXACT_IN_SINGLE, [CurrentConfig]);
    v4Planner.addAction(Actions.SETTLE_ALL, [
      tokenInAddress,
      CurrentConfig.amountIn,
    ]);
    v4Planner.addAction(Actions.TAKE_ALL, [
      tokenOutAddress,
      CurrentConfig.amountOutMinimum,
    ]);
    const encodedActions = v4Planner.finalize();
    routePlanner.addCommand(CommandType.V4_SWAP, [
      v4Planner.actions,
      v4Planner.params,
    ]);

    if (tokenInAddress !== ethers.constants.AddressZero) {
      await approveErc20Token(tokenInAddress, deadline);
    }

    const txOptions: any = {};
    if (tokenInAddress === ethers.constants.AddressZero) {
      txOptions.value = CurrentConfig.amountIn;
    }
    const tx = await universalRouter.execute(
      routePlanner.commands,
      [encodedActions],
      deadline,
      txOptions
    );
    const receipt = await tx.wait();
    return receipt;
  } catch (error: any) {
    throw error;
  }
};

const approveErc20Token = async (tokenInAddress: string, deadline: number) => {
  const signer = await getSigner();
  try {
    const erc20Contract = new ethers.Contract(
      tokenInAddress,
      [
        "function approve(address spender, uint256 amount) external returns (bool)",
      ],
      signer
    );

    await erc20Contract.approve(PERMIT2_ADDRESS, ethers.constants.MaxUint256);

    const permit2Contract = new ethers.Contract(
      PERMIT2_ADDRESS,
      PERMIT2_ABI,
      signer
    );

    await permit2Contract.approve(
      tokenInAddress,
      UNIVERSAL_ROUTER_ADDRESS,
      ethers.BigNumber.from(2).pow(160).sub(1), // MAX_UINT160
      deadline
    );
  } catch (error) {
    throw error;
  }
};
