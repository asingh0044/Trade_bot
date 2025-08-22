"use client";
import { Loader2 } from "@/components/common/Loader";
import { Button } from "@/components/ui/button";
import { useGetQuote } from "@/hooks/useGetQuote";
import { useGetSwap } from "@/hooks/useGetSwap";
import { SEPOLIA_CHAINID, USDC_ADDRESS } from "@/lib/constant";
import { getUniswapConfig } from "@/services/getUniswapConfig";
import { SwapExactInSingle } from "@uniswap/v4-sdk";
import { formatUnits } from "ethers/lib/utils";
import { ArrowDownUp } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { erc20Abi } from "viem";
import { useAccount, useBalance, useReadContract } from "wagmi";

const Page = () => {
  const [asset1, setAsset1] = useState<string>("");
  const [config, setConfig] = useState<SwapExactInSingle | null>(null);
  const { address } = useAccount();
  const [loading, setLoading] = useState<boolean>(false);
  const { data: walletBalance, refetch: refetchEThBalance } = useBalance({
    address,
  });

  const { data, refetch: refetchUsdcBalance } = useReadContract({
    address: USDC_ADDRESS,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    chainId: SEPOLIA_CHAINID,
  });
  const usdcBalance = data ? formatUnits(data as bigint, 6) : "0";
  const { data: quoteData, refetch } = useGetQuote(config);
  if (address && asset1) {
  }
  useEffect(() => {
    setLoading(true);
    if (asset1) {
      const config = getUniswapConfig(asset1);
      setConfig(config!);
      refetch();
    }
    setLoading(false);
  }, [asset1]);

  const { mutate, isPending } = useGetSwap();
  const swapHandler = () => {
    if (config) {
      mutate(config, {
        onSuccess: () => {
          toast("Swap successful");
          setAsset1("");
          refetchEThBalance();
          refetchUsdcBalance();
        },
        onError: () => {
          toast("Swap Failed");
        },
      });
    }
  };
  return (
    <div className="w-full h-[calc(100vh-6rem)] flex items-center justify-center">
      <div className="space-y-8 w-11/12 relative md:w-3/4 lg:w-[600px] py-6 px-4 lg:py-12 lg:px-8 rounded-md shadowm-sm">
        <div className="w-full bg-white p-8 rounded-md">
          <div className="flex w-full justify-between">
            <div className="w-3/4">
              <div>Sell</div>
              <input
                value={asset1}
                type="text"
                placeholder="0.05"
                className="w-1/2 outline-none border-0 text-6xl font-bold "
                onChange={(e) => setAsset1(e.target.value)}
              />
            </div>

            <div className="">
              <div className="font-semibold text-2xl text-right">
                {walletBalance?.symbol}
              </div>
              <div
                className={`text-right ${
                  Number(asset1) > Number(walletBalance?.formatted)
                    ? "text-red-500"
                    : "text-gray-500"
                }`}
              >
                {Number(walletBalance?.formatted).toFixed(6)}
              </div>
            </div>
          </div>
        </div>

        <button className="w-fit mx-auto absolute top-[38.5%] left-[45%]  bg-white p-2.5 text-black border-4 border-black rounded-md cursor-pointer">
          <ArrowDownUp />
        </button>
        <div className="w-full bg-white p-8 rounded-md">
          <div className="flex w-full justify-between">
            <div className="w-3/4">
              <div>Buy</div>
              <>
                {loading === true ? (
                  <Loader2 />
                ) : (
                  <>
                    {asset1 === "" ? (
                      <input
                        disabled
                        type="text"
                        className=" outline-none border-0 text-6xl font-bold "
                        value={""}
                      />
                    ) : (
                      <input
                        disabled
                        type="text"
                        className=" outline-none border-0 text-6xl font-bold "
                        value={quoteData || ""}
                      />
                    )}
                  </>
                )}
              </>
            </div>

            <div className="">
              <div className="font-semibold text-2xl text-right">USDC</div>
              {usdcBalance && (
                <div className="text-right text-gray-500">{usdcBalance}</div>
              )}
            </div>
          </div>
        </div>

        <Button
          onClick={swapHandler}
          disabled={asset1.length <= 0}
          className="w-full py-4 cursor-pointer"
        >
          {isPending ? "Loading..." : "Swap"}
        </Button>
      </div>
    </div>
  );
};

export default Page;
