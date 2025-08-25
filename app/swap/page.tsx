"use client";
import { Loader2 } from "@/components/common/Loader";
import { TokenDropdown } from "@/components/common/TokenDropdown";
import { Button } from "@/components/ui/button";
import { useGetQuote } from "@/hooks/useGetQuote";
import { useGetSwap } from "@/hooks/useGetSwap";
import { useWalletTokens } from "@/hooks/useWalletTokens";
import { ETH_TOKEN, USDC_TOKEN } from "@/lib/constant";
import { getSwapTokens } from "@/services/getSwapTokens";
import { getUniswapConfig } from "@/services/getUniswapConfig";
import { addSepoliaETH } from "@/services/UpdatedTokens";
import { SwapExactInSingle } from "@uniswap/v4-sdk";
import { ArrowDownUp } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAccount, useBalance } from "wagmi";

const Page = () => {
  const [asset1, setAsset1] = useState<string>("");
  const [config, setConfig] = useState<SwapExactInSingle | null>(null);
  const { address } = useAccount();
  const [loading, setLoading] = useState<boolean>(false);
  const [token1Index, setToken1Index] = useState<number>(-1);
  const [token2Index, setToken2Index] = useState<number>(-1);

  const { data: walletBalance, refetch: refetchEThBalance } = useBalance({
    address,
  });
  const { data: walletTokens, refetch: refetchTokens } = useWalletTokens(
    address!
  );
  let updatedTokens = walletTokens;
  if (walletTokens && walletBalance) {
    updatedTokens = addSepoliaETH(updatedTokens!, walletBalance.formatted);
  }

  const { data: quoteData, refetch } = useGetQuote(
    config,
    getSwapTokens(token2Index)
  );
  if (address && asset1) {
  }
  useEffect(() => {
    setLoading(true);
    //todo: debouncing
    if (asset1) {
      const config = getUniswapConfig(
        getSwapTokens(token1Index),
        getSwapTokens(token2Index),
        asset1
      );
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
          refetchTokens();
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
          <div className="w-full flex justify-between ">
            <div>Sell</div>
            <div className="">
              <TokenDropdown
                dropdownProps={{
                  tokenIndex: token1Index,
                  data: updatedTokens,
                  setTokenIndex: setToken1Index,
                }}
              />
              {token1Index !== -1 && (
                <div
                  className={`text-sm text-right ${
                    Number(asset1) >
                    Number(walletTokens?.[token1Index]?.tokenBalance)
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {updatedTokens?.[token1Index].tokenBalance}
                </div>
              )}
            </div>
          </div>

          <input
            value={asset1}
            type="text"
            placeholder="0.05"
            className="w-full mt-3 outline-none border-0 text-6xl font-bold "
            onChange={(e) => setAsset1(e.target.value)}
          />
        </div>

        {/* <button className="w-fit mx-auto absolute top-[41%] left-[45%]  bg-white p-2.5 text-black border-4 border-black rounded-md cursor-pointer">
          <ArrowDownUp />
        </button> */}
        <div className="w-full bg-white p-8 rounded-md">
          <div className="w-full flex justify-between">
            <div>Buy</div>
            <div className="">
              <TokenDropdown
                dropdownProps={{
                  tokenIndex: token2Index,
                  data: updatedTokens,
                  setTokenIndex: setToken2Index,
                }}
              />
              {token2Index !== -1 && (
                <div className="text-right text-sm  ">
                  {updatedTokens?.[token2Index]?.tokenBalance}
                </div>
              )}
            </div>
          </div>

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
                  <div className=" outline-none border-0 text-6xl font-bold ">
                    {Number(quoteData).toFixed(6) || ""}
                  </div>
                )}
              </>
            )}
          </>
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
