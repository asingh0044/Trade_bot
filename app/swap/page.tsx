"use client";
import { Card1 } from "@/components/swap/Card1";
import { Card2 } from "@/components/swap/Card2";
import { Button } from "@/components/ui/button";
import { useGetQuote } from "@/hooks/useGetQuote";
import { useGetSwap } from "@/hooks/useGetSwap";
import { useWalletTokens } from "@/hooks/useWalletTokens";
import { useWrap } from "@/hooks/useWrap";
import { getSwapTokens } from "@/services/getSwapTokens";
import { getUniswapConfig } from "@/services/getUniswapConfig";
import { addSepoliaETH } from "@/services/UpdatedTokens";
import { SwapExactInSingle } from "@uniswap/v4-sdk";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAccount, useBalance } from "wagmi";

const Page = () => {
  const [asset1, setAsset1] = useState<string>("");
  const [config, setConfig] = useState<SwapExactInSingle | null>(null);
  const { address } = useAccount();
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

  const {
    data: quoteData,
    refetch,
    isLoading,
    isFetching,
  } = useGetQuote(config, getSwapTokens(token2Index));
  if (address && asset1) {
  }
  useEffect(() => {
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

  const { mutate: mutateWrap, isPending: wrapPending } = useWrap();
  const wrapHandler = () => {
    if (!token1Index || !token2Index) return;
    const inputToken = getSwapTokens(token1Index);
    mutateWrap(
      { inputToken, amount: asset1 },
      {
        onSuccess: () => {
          toast(token1Index === 3 ? "Unwrap successful" : "Wrap successful");
          setAsset1("");
          refetchEThBalance();
          refetchTokens();
        },
        onError: () => {
          toast(token1Index === 3 ? "Unwrap failed" : "Wrap failed");
        },
      }
    );
  };
  return (
    <div className="w-full h-[calc(100vh-6rem)] flex items-center justify-center">
      <div className="space-y-8 w-11/12 relative md:w-3/4 lg:w-[600px] py-6 px-4 lg:py-12 lg:px-8 rounded-md shadowm-sm">
        <Card1
          props={{
            token1Index: token1Index,
            updatedTokens: updatedTokens!,
            setToken1Index: setToken1Index,
            asset1: asset1,
            setAsset1: setAsset1,
          }}
        />
        <Card2
          props={{
            token1Index: token1Index,
            token2Index: token2Index,
            updatedTokens: updatedTokens!,
            setToken2Index: setToken2Index,
            asset1: asset1,
            quoteData: quoteData!,
            isLoading: isLoading,
            isFetching: isFetching,
          }}
        />

        {(token1Index === 3 && token2Index === 4) ||
        (token1Index === 4 && token2Index === 3) ? (
          <Button
            onClick={wrapHandler}
            disabled={asset1.length <= 0}
            className="w-full py-4 cursor-pointer"
          >
            {wrapPending ? (
              "Loading..."
            ) : (
              <span>{token1Index === 3 ? "Unwrap" : "Wrap"}</span>
            )}
          </Button>
        ) : (
          <Button
            onClick={swapHandler}
            disabled={asset1.length <= 0}
            className="w-full py-4 cursor-pointer"
          >
            {isPending ? "Loading..." : "Swap"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Page;
